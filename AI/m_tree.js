/**
 * Created by 缘 on 2015/3/7.
 */

/** import modules */
var bt = require('./BehaviorTree.js-master/btree-complete.min.js');
var kdtree = require('./kdTree-min.js');

/** coordinates object */
var Coor = function(x,y){
    this.x = x;
    this.y = y;
};

/** speed object, it is a vector which indicate the players current speed on x axis and y axis */
var Speed = function(x,y){
    this.x = x;
    this.y = y;
};

/** Para object */
var Para = function(p_coors, p_speeds, o_coors, i_speed, i_coor, p_range, i_range){
    // p_coors and o_coors are array of coor that indicate the object IN SIGHT OF the AI

    /** fields that you need to input for AI next movement */
    this.p_coors = p_coors;
    this.p_speeds = p_speeds;
    this.o_coors = o_coors;
    this.i_speed = i_speed;
    this.i_coor = i_coor;
    this.p_range = p_range;
    this.i_range = i_range;

    /** fields that AI trees will assign to*/
    this.i_next_coor = this.i_coor;
    // stuff indicates the stuff been destroyed by AI: [[x,y],dist], [undefined,undefined] indicates none is destroyed
    this.stuff = [undefined,undefined];
    // player indicates the player that is nearest to AI within the range of tesla gun centered at AI: [[x,y],dist], [undefined,undefined] indicates none is destroyed
    this.player = [undefined,undefined];
};

/** Euclidean distance*/
var distance = function(a, b){
    return Math.sqrt(Math.pow(a.x - b.x, 2) +  Math.pow(a.y - b.y, 2));
};

/** return the nearest available object to be destroyed: [index,dist_to_ai], return [undefined,undefined] if not exists*/
function get_near_aval(para){

    var points = new Array(para.p_coors.length);

    for(var i=0;i<para.p_coors.length;i++){
        points[i] = {x:para.p_coors[i][0],y:para.p_coors[i][1]};
    }
    var tree = new kdtree.kdTree(points, distance, ["x", "y"]);

    var cand=[undefined, undefined];
    for(var j=0;j<para.o_coors.length;j++){
        var nearest = tree.nearest({ x: para.o_coors[j][0], y: para.o_coors[j][1] },1,para.p_range);
        if( nearest[0] !== undefined && (cand[0] === undefined || cand[1] > nearest[0][1])){
            cand[0] = [para.o_coors[j][0],para.o_coors[j][1]];
            cand[1] = distance({x:para.i_coor[0],y:para.i_coor[1]},{x:para.o_coors[j][0],y:para.o_coors[j][1]});
        }
    }

    return cand;
}

/** find the nearest palyer to AI within the range of tesla gun centered at AI coordinates, return [] means none*/
function get_near_p(para){
    var points = new Array(para.p_coors.length);

    for(var i=0;i<para.p_coors.length;i++){
        points[i] = {x:para.p_coors[i][0],y:para.p_coors[i][1]};
    }
    var tree = new kdtree.kdTree(points, distance, ["x", "y"]);

    var nearest = tree.nearest({ x: para.i_coor[0], y: para.i_coor[1]},1,para.p_range);
    return nearest[0];
}

var btree = new bt({
    title:'AI behavior',
    tree: new bt.Priority({
        title: 'root',
        nodes:[
            new bt.Sequence({
                title: 'search',
                nodes:[
                    new bt.Sequence({
                       title: 'find',
                        nodes: [
                            new bt.Task({
                                title: 'con:search_if_has',
                                run : function(para){
                                    var cand = get_near_aval(para);
                                    if(cand[0] === undefined){
                                        console.log('con:search_if_has_fail');
                                        this.fail();
                                    }else{
                                        console.log('con:search_if_has');
                                        console.log('return_closet');
                                        para.stuff = cand;
                                        this.success();
                                    }
                                }
                            })
                        ]
                    }),new bt.Priority({
                        title: 'attempt_kill',
                        nodes: [
                            new bt.Sequence({
                                title: 'kill',
                                nodes: [
                                    new bt.Task({
                                        title: 'con:is_close',
                                        run: function(para){
                                            if(para.i_range >= para.stuff[1]){
                                                console.log('con:is_close');
                                                this.success();
                                            }else{
                                                console.log('con:is_close_fail');
                                                this.fail();
                                            }
                                        }
                                    }), new bt.Task({
                                        title: 'kill',
                                        run : function(para){
                                            // do nothing
                                            console.log('kill');
                                            this.success();
                                        }
                                    })
                                ]
                            }),new bt.Task({
                                title: 'get_closer',
                                run: function(para){
                                    console.log('get_closer');

                                    para.i_next_coor[0] = para.i_coor[0] + para.i_speed * (para.stuff[0][0] - para.i_coor[0]) / para.stuff[1];
                                    para.i_next_coor[1] = para.i_coor[1] + para.i_speed * (para.stuff[0][1] - para.i_coor[1]) / para.stuff[1];
                                    para.stuff = [undefined,undefined];
                                    this.success();
                                }
                            })
                        ]
                    })
                ]
            }), new bt.Priority({
                title: 'move',
                nodes:[
                    new bt.Sequence({
                        title: 'away_from_attack',
                        nodes:[
                            new bt.Task({
                                title: 'con:is_in_range',
                                run: function(para){
                                    var cand = get_near_p(para);
                                    if(cand[0] === undefined){
                                        console.log('con:is_in_range_fail');
                                        this.fail();
                                    }else{
                                        para.player = cand;
                                        console.log('con:is_in_range');
                                        this.success();
                                    }
                                }
                            }), new bt.Task({
                                title: 'out_of_range',
                                run: function(para){
                                    para.i_next_coor[0] = para.i_coor[0] - para.i_speed * (para.player[0][0] - para.i_coor[0]) / para.player[1];
                                    para.i_next_coor[1] = para.i_coor[1] - para.i_speed * (para.player[0][1] - para.i_coor[1]) / para.player[1];
                                    console.log('out_of_range');
                                    this.success();
                                }
                            })
                        ]
                    }),new bt.Task({
                        title: 'away_from_team',
                        run: function(para){
                            console.log('away_from_team');
                            if(para.p_coors.length == 0){
                                /** if no player and no object insight then do a random walk*/
                                sign = Math.random()-0.5;
                                sign = sign?sign<0?-1:1:0;
                                delta_x = sign * Math.random()*para.i_speed;

                                sign = Math.random()-0.5;
                                sign = sign?sign<0?-1:1:0;
                                delta_y = sign * Math.sqrt(Math.pow(para.i_speed,2) - Math.pow(delta_x,2));

                                para.i_next_coor[0] = para.i_coor[0] + delta_x;
                                para.i_next_coor[1] = para.i_coor[1] + delta_y;
                            }else{
                                var x_mean = 0;
                                var y_mean = 0;
                                for(var i=0;i<para.p_coors.length;i++){
                                    x_mean += para.p_coors[i][0];
                                    y_mean += para.p_coors[i][1];
                                }
                                x_mean /= para.p_coors.length;
                                y_mean /= para.p_coors.length;
                                /** if the geometry center of player is similar to AI coor, it chooses to take one side*/
                                if(Math.abs(para.i_next_coor[0] - x_mean) < 1e-3 && Math.abs(para.i_next_coor[1] - y_mean) < 1e-3){
                                    x_mean = para.p_coors[0][0];
                                    y_mean = para.p_coors[0][1];
                                }

                                var dist = distance({x:x_mean,y:y_mean},{x:para.i_coor[0],y:para.i_coor[1]});

                                para.i_next_coor[0] = para.i_coor[0] - para.i_speed * (x_mean - para.i_coor[0]) / dist;
                                para.i_next_coor[1] = para.i_coor[1] - para.i_speed * (y_mean - para.i_coor[1]) / dist;
                            }

                            this.success();
                        }
                    })
                ]
            })
        ]
    })
});

btree.setObject(new Para());
btree.step();

