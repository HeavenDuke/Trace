/**
 * Created by 缘 on 2015/3/7.
 */
var bt = require('./BehaviorTree.js-master/btree-complete.min.js');

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
                                        this.success();
                                    }else{
                                        this.fail();
                                    }
                                }
                            }),new bt.Task({
                               title: 'return_closet',
                                run : function(){
                                    //TODO
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
                                            if(1){
                                                this.success();
                                            }else{
                                                this.fail();
                                            }
                                        }
                                    }), new bt.Task({
                                        title: 'kill',
                                        run : function(){
                                            //TODO
                                            this.success();
                                        }
                                    })
                                ]
                            }),new bt.Task({
                                title: 'get_closer',
                                run: function(){
                                    // TODO
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
                                    if(1){
                                        this.success();
                                    }else{
                                        this.fail();
                                    }
                                }
                            }), new bt.Task({
                                title: 'out_of_range',
                                run: function(){
                                    //TODO
                                    this.success();
                                }
                            })
                        ]
                    }),new bt.Task({
                        title: 'away_from_team',
                        run: function(){
                            //TODO
                            this.success();
                        }
                    })
                ]
            })
        ]
    })
});

btree.step();

