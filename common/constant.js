/**
 * Created by jiabinbin on 2017/3/14.
 *
 * 常见参数配置
 */

module.exports = {

    CrawlersUrl:{
        wangyi:{
            search:{
                url:"http://music.163.com/#/search/m/?type=1002&s=三生三世",
                type:[ // 单曲，歌手，专辑，MV,歌词，歌单，主播电台，用户
                    "1","100","10","1004","1006","1000","1009","1002"
                ]
            }
        },
        kugou:{
            search:{
                url:"http://www.kugou.com/yy/html/search.html#searchType=song&searchKeyWord=三生三世",
                type:[ //单曲，歌单，MV
                    "song","special","mv"
                ]
            }
        },
        qq:{
            search:{
                url:"https://y.qq.com/portal/search.html#page=1&searchid=1&remoteplace=txt.yqq.top&t=song&w=三生三世",
                type:[ //单曲，专辑，MV，歌单，歌词
                    "song","album","mv","playlist","lyric"
                ],
                //maxPageNum:20
            }
        }
    }
}