// [00:01.000] 作曲 : 许嵩
// [00:17.100]那阵子我们的感情出了一些问题
// [00:21.200]可是我也不太清楚问题出在哪里
// [00:25.830]你面无表情的话语不剩多少意义
// [00:29.729]就当我求求你 给我一些说明
// [00:34.629]ok 我猜你只是暂时的压抑心情
// [00:38.379]不再去追问你 多给你一些关心
// [00:41.249]打电话请你去看最新的电影
// [00:44.979]你说工作很忙要加班到夜里

const parseExp = /\[(\d{2}):(\d{2}).(\d{2,3})\]/;
export function parseLyric(lyricString){
    const lineStrings = lyricString.split('\n');
    let lyrics = []
    for(let line of lineStrings){
        const result = parseExp.exec(line)
        if(!result) continue;
        const time1 = result[1] * 1000 *60;
        const time2 = result[2] * 1000;
        const time3 = result[3].length === 3? result[3]*1: result[3]*10;
        const time = time1+time2+time3;
        const content = line.replace(parseExp,"").trim();
        const lineObj = {time,content};
        lyrics.push(lineObj)
    }
    return lyrics
}