/**
 * Created by jiabinbin on 2017/3/14.
 *
 * 常见参数配置
 */

module.exports = {
    BaseParams:{
        search:{
            all:'all', //所有
            song:'song',//单曲
            special:'special',//歌单
            mv:'mv',//mv
            album:'album',//专辑
            lyric:'lyric'//歌词
        }
    },
    CrawlersUrl:{
        wangyi:{
            id:1,
            search:{
                url:"http://music.163.com/#/search/m/?",//type=1002&s=三生三世
                type:[ // 单曲，歌手，专辑，MV,歌词，歌单，主播电台，用户
                    "1","100","10","1004","1006","1000","1009","1002"
                ]
            }
        },
        kugou:{
            id:2,
            search:{
                url:"http://www.kugou.com/yy/html/search.html#",//searchType=song&searchKeyWord=三生三世
                type:[ //单曲，歌单，MV
                    "song","special","mv"
                ]
            }
        },
        qq:{
            id:3,
            search:{
                url:"https://y.qq.com/portal/search.html#",//page=1&searchid=1&remoteplace=txt.yqq.top&t=song&w=三生三世
                type:[ //单曲，专辑，MV，歌单，歌词
                    "song","album","mv","playlist","lyric"
                ],
                //maxPageNum:20
            }
        },
        kuwo:{
            id:4,
            search:{
                url:"http://sou.kuwo.cn/ws/NSearch?",//type=all&catalog=yueku20177&key=三生三世
                type:[
                    //综合 歌手 歌曲 专辑 MV 歌单 歌词
                    "all","artist","music","album","mv","playlist","lyric"
                ]
            }
        }
    }
}