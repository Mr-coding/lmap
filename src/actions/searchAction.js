import {
    cac
} from '../utils/util';
import * as Ds from '../libs/DataService';
// 设置rboxkey
export const SET_RBOX_KEY = 'SET_RBOX_KEY'
const setRboxKey = cac(SET_RBOX_KEY, 'rboxkey')


// search点击事件
export const RECEIVE_CRA_LIST = 'RECEIVE_CRA_LIST'
export const SET_KEYWORD = 'SET_KEYWORD'
export const PAGE_SIZE = 1

const receiveList = cac(RECEIVE_CRA_LIST, 'data', 'page')
const setKeyord = cac(SET_KEYWORD, 'value')

export const fetchSearchList = (keyword, rboxkey, page = 1) => {
    return (dispatch, getState) => {

        dispatch(setRboxKey(rboxkey))

        if (!keyword && keyword != '') {
            keyword = getState().search.keyword

        } else {
            dispatch(setKeyord(keyword))
        }
        //console.log(keyword);
        let param = {
            name: keyword
        }
        Ds.DataService('/guidance_mapSearch/map_dwsbxxByName.do', param,
            (resp) => {
                console.log('map_dwsbxxByName', 'dataRecv', resp.aaData);
                let data = resp.aaData;
                dispatch(receiveList(data, page))
            },
            (e) => {
                console.log(e);
                alert("传输错误", e)
            });
        /*let data = {
            "errorCode": "success",
            "iTotalDisplayRecords": 0,
            "errorText": "操作成功",
            "aaData": {
                "jsonMap": {
                    "type": "FeatureCollection",
                    "features": [{
                        "type": "Feature",
                        "properties": {
                            "id": "6a60a35aad4e4f9aa57900e0b1e1734a"
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [null, null]
                        }
                    }, {
                        "type": "Feature",
                        "properties": {
                            "id": "49c4fda6ec834403adeb2d1fa77d2637"
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [null, null]
                        }
                    }]
                },
                "bYdYdps": [{
                    "xh": "6a60a35aad4e4f9aa57900e0b1e1734a",
                    "supportImage": 0,
                    "pbh": "12333",
                    "pmc": "12哈哈3",
                    "supportVideo": 0,
                    "plx": 0
                }, {
                    "xh": "6a60a35aad4e4f9aa57900e0b1e1734a",
                    "supportImage": 0,
                    "pbh": "12333",
                    "pmc": "12哈哈3",
                    "supportVideo": 0,
                    "plx": 0
                }, {
                    "xh": "6a60a35aad4e4f9aa57900e0b1e1734a",
                    "supportImage": 0,
                    "pbh": "12333",
                    "pmc": "12哈哈3",
                    "supportVideo": 0,
                    "plx": 0
                }, {
                    "xh": "6a60a35aad4e4f9aa57900e0b1e1734a",
                    "supportImage": 0,
                    "pbh": "12333",
                    "pmc": "12哈哈3",
                    "supportVideo": 0,
                    "plx": 0
                }, {
                    "xh": "6a60a35aad4e4f9aa57900e0b1e1734a",
                    "supportImage": 0,
                    "pbh": "12333",
                    "pmc": "12哈哈3",
                    "supportVideo": 0,
                    "plx": 0
                }, {
                    "xh": "6a60a35aad4e4f9aa57900e0b1e1734a",
                    "supportImage": 0,
                    "pbh": "12333",
                    "pmc": "12哈哈3",
                    "supportVideo": 0,
                    "plx": 0
                }, {
                    "xh": "6a60a35aad4e4f9aa57900e0b1e1734a",
                    "supportImage": 0,
                    "pbh": "12333",
                    "pmc": "12哈哈3",
                    "supportVideo": 0,
                    "plx": 0
                }, {
                    "xh": "6a60a35aad4e4f9aa57900e0b1e1734a",
                    "supportImage": 0,
                    "pbh": "12333",
                    "pmc": "12哈哈3",
                    "supportVideo": 0,
                    "plx": 0
                }, {
                    "xh": "6a60a35aad4e4f9aa57900e0b1e1734a",
                    "supportImage": 0,
                    "pbh": "12333",
                    "pmc": "12哈哈3",
                    "supportVideo": 0,
                    "plx": 0
                }, {
                    "xh": "49c4fda6ec834403adeb2d1fa77d2637",
                    "supportImage": 0,
                    "pbh": "123",
                    "pmc": "123",
                    "supportVideo": 0,
                    "plx": 0
                }]
            },
            "sEcho": "",
            "iTotalRecords": 0,
            "iDisplayStart": 0
        }
        dispatch(receiveList(data.aaData, page))*/

    }
}



export const PUSH_CRA_LIST = 'PUSH_CRA_LIST'
export const pushCRAList = cac(PUSH_CRA_LIST, 'list')
var d = new Date();
var myday = null;
var last_Path;
var sendParam2 = null;
var dataRecv = null;

export const fetchCRAList = (rboxkey, t, page) => {
    console.log('time', t)
    var month = d.getMonth() + 1;
    if (t == undefined) {
        myday = d.getFullYear() + "/" + month + "/" + d.getDate() + " " + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
        if (rboxkey == 'cross') last_Path = '/trafficindex_map/listYdlkMore.do';
        else if (rboxkey == 'road') last_Path = '/trafficindex_map/listYdldMore.do';
        else if (rboxkey == 'area') last_Path = '/trafficindex_map/listYdqyMore.do';
        console.log('myday', myday);
        sendParam2 = {
            queryTime: myday,
            pageIndex: 1,
            pageSize: 10,
            isFirst: true
        };
    } else if (t && (t.flags == null)) {
        if (t.rboxkey == 'cross') last_Path = '/trafficindex_map/listYdlkMore.do';
        else if (t.rboxkey == 'road') last_Path = '/trafficindex_map/listYdldMore.do';
        else if (t.rboxkey == 'area') last_Path = '/trafficindex_map/listYdqyMore.do';
        sendParam2 = {
            queryTime: t.sj,
            pageIndex: 1,
            pageSize: 10,
            isFirst: true
        };
    } else {
        myday = t.sj;
        var YWD = t.flags;
        sendParam2 = {
            date: myday,
            flag: YWD,
            pageIndex: 1,
            pageSize: 10,
            isFirst: true
        };
        if (rboxkey == 'cross') last_Path = '/trafficindex_map/crossJtda.do';
        else if (rboxkey == 'road') last_Path = '/trafficindex_map/roadJtda.do';
        else if (rboxkey == 'area') last_Path = '/trafficindex_map/zoneJtda.do';
    }
    Ds.DataService(last_Path, sendParam2,
        (resp) => {
            dataRecv = resp.aaData;
            console.log(dataRecv);
        },
        (e) => {
            console.log(e);
            alert("后台传输有误！")
        });
    return (dispatch, getState) => {
        dispatch(pushCRAList(dataRecv));
        dispatch(setRboxKey(rboxkey));
        //dispatch不执行,放下面就不执行了，先走rboxkey会render，然后执行的值是空然后报错。不执行。应该先push data，再用rbox渲染
    }

}