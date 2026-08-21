export type ScenicSpot = {
  id: string;
  name: string;
  short: string;
  intro: string;
  tag: string;
  time: string;
  x: number;
  y: number;
  image?: string;
  imageAlt?: string;
};

/**
 * 景点在数组中的顺序，就是推荐路线与快速导航的顺序。
 * x / y 是景点标记在地图中的百分比坐标，范围为 0–100。
 * 图片请放入 public/spots/，并填写成 /spots/文件名.webp。
 */
export const spots: ScenicSpot[] = [
  {
    id: 'lotus',
    name: '荷园客码头',
    short: '从湖面抵达岛屿',
    intro: '北侧入岛的重要节点。夏日荷风、往来游船与广阔湖面共同组成抵达微山岛的第一幅风景。',
    tag: '码头',
    time: '建议 30 分钟',
    x: 61,
    y: 25,
    image: '',
    imageAlt: '',
  },
  {
    id: 'culture',
    name: '微子文化苑',
    short: '微山岛的人文地标',
    intro: '循着微子文化的历史脉络，读懂微山岛深厚的人文底色。园区建筑与岛上湖景相映，是认识这座岛的理想起点。',
    tag: '人文',
    time: '建议 60 分钟',
    x: 55,
    y: 52,
    image: '',
    imageAlt: '',
  },
  {
    id: 'railway',
    name: '铁道游击队纪念园',
    short: '一段烽火中的湖上记忆',
    intro: '以铁道游击队抗战事迹为主题的纪念空间，在展陈与园林之间回望鲁南军民的英雄故事。',
    tag: '红色文化',
    time: '建议 90 分钟',
    x: 36,
    y: 55,
    image: '',
    imageAlt: '',
  },
  {
    id: 'wetland',
    name: '微子林',
    short: '在古意与绿荫间漫步',
    intro: '岛西的静谧绿地，适合放慢脚步。林间小径串联村落与湖岸，也让历史叙事回到自然之中。',
    tag: '自然',
    time: '建议 45 分钟',
    x: 28,
    y: 60,
    image: '',
    imageAlt: '',
  },
  {
    id: 'sunset',
    name: '吕蒙墓码头',
    short: '湖岸落日观景点',
    intro: '位于岛东南的临湖节点。傍晚视野开阔，适合把一天的行程收束在湖风与落日里。',
    tag: '观景',
    time: '建议 40 分钟',
    x: 80,
    y: 74,
    image: '',
    imageAlt: '',
  },
];
