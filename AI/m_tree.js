/**
 * Created by 缘 on 2015/3/7.
 */
var bt = require('./BehaviorTree.js-master/btree-complete.min.js');

/** coordinates object */
var Coor = function(x,y){
    this.x = x;
    this.y = y;
};

Coor.prototype.dist = function(coor){
    return Math.sqrt(Math.pow(this.x-coor.x,2) + Math.pow(this.y-coor.y,2));
};

/** speed object, it is a vector which indicate the players current speed on x axis and y axis */
var Speed = function(x,y){
    this.x = x;
    this.y = y;
};

/** Para object */
var Para = function(p_coors, p_speeds, o_coors, i_speed, i_coor, p_range){
    // p_coors and o_coors are array of coor that indicate the object IN SIGHT OF the AI

    /** fields that you need to input for AI next movement */
    this.p_coors = p_coors;
    this.p_speeds = p_speeds;
    this.o_coors = o_coors;
    this.i_speed = i_speed;
    this.i_coor = i_coor;
    this.p_range = p_range;

    /** fields that AI trees will assign to*/
    this.i_next_coor = this.i_coor;
    // index indicates the stuff been destroyed by AI in the array o_coors, -1 indicates none is destroyed
    this.stuff_index = -1;
};

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
                                run : function(){
                                    //TODO
                                    if(1){
                                        console.log('con:search_if_has');
                                        this.success();
                                    }else{
                                        console.log('con:search_if_has_fail');
                                        this.fail();
                                    }
                                }
                            }),new bt.Task({
                               title: 'return_closet',
                                run : function(para){
                                    //TODO
                                    console.log('return_closet');
                                    this.success();
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
                                        run: function(){
                                            //TODO
                                            if(0){
                                                console.log('con:is_close');
                                                this.success();
                                            }else{
                                                console.log('con:is_close_fail');
                                                this.fail();
                                            }
                                        }
                                    }), new bt.Task({
                                        title: 'kill',
                                        run : function(){
                                            //TODO
                                            console.log('kill');
                                            this.success();
                                        }
                                    })
                                ]
                            }),new bt.Task({
                                title: 'get_closer',
                                run: function(){
                                    // TODO
                                    console.log('get_closer');
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
                                run: function(){
                                    //TODO
                                    if(0){
                                        console.log('con:is_in_range');
                                        this.success();
                                    }else{
                                        console.log('con:is_in_range_fail');
                                        this.fail();
                                    }
                                }
                            }), new bt.Task({
                                title: 'out_of_range',
                                run: function(){
                                    //TODO
                                    console.log('out_of_range');
                                    this.success();
                                }
                            })
                        ]
                    }),new bt.Task({
                        title: 'away_from_team',
                        run: function(){
                            //TODO
                            console.log('away_from_team');
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

