import Card1 from '@/assets/cards/0.jpg';
import Card2 from '@/assets/cards/1.jpg';
import Card3 from '@/assets/cards/2.jpg';
import Card4 from '@/assets/cards/3.jpg';
import Card5 from '@/assets/cards/4.jpg';
import Card6 from '@/assets/cards/5.jpg';
import Card7 from '@/assets/cards/6.jpg';
import Card8 from '@/assets/cards/7.jpg';
import Card9 from '@/assets/cards/8.jpg';
import Card10 from '@/assets/cards/9.jpg';
import Card11 from '@/assets/cards/10.jpg';
import Card12 from '@/assets/cards/11.jpg';
import Card13 from '@/assets/cards/12.jpg';
import Card14 from '@/assets/cards/13.jpg';
import Card15 from '@/assets/cards/14.jpg';
import Card16 from '@/assets/cards/15.jpg';
import Card17 from '@/assets/cards/16.jpg';
import Card18 from '@/assets/cards/17.jpg';
import Card19 from '@/assets/cards/18.jpg';
import Card20 from '@/assets/cards/19.jpg';
import Card21 from '@/assets/cards/20.jpg';
import Card22 from '@/assets/cards/21.jpg';
import Card23 from '@/assets/cards/22.jpg';
import Card24 from '@/assets/cards/23.jpg';
import Card25 from '@/assets/cards/24.jpg';
import Card26 from '@/assets/cards/25.jpg';
import Card27 from '@/assets/cards/26.jpg';
import Card28 from '@/assets/cards/27.jpg';
import Card29 from '@/assets/cards/28.jpg';
import Card30 from '@/assets/cards/29.jpg';
import Card31 from '@/assets/cards/30.jpg';
import Card32 from '@/assets/cards/31.jpg';
import Card33 from '@/assets/cards/32.jpg';
import Card34 from '@/assets/cards/33.jpg';
import Card35 from '@/assets/cards/34.jpg';
import Card36 from '@/assets/cards/35.jpg';
import Card37 from '@/assets/cards/36.jpg';
import Card38 from '@/assets/cards/37.jpg';
import Card39 from '@/assets/cards/38.jpg';
import Card40 from '@/assets/cards/39.jpg';
import Card41 from '@/assets/cards/40.jpg';
import Card42 from '@/assets/cards/41.jpg';
import Card43 from '@/assets/cards/42.jpg';
import Card44 from '@/assets/cards/43.jpg';
import Card45 from '@/assets/cards/44.jpg';
import Card46 from '@/assets/cards/45.jpg';
import Card47 from '@/assets/cards/46.jpg';
import Card48 from '@/assets/cards/47.jpg';
import Card49 from '@/assets/cards/48.jpg';
import Card50 from '@/assets/cards/49.jpg';
import Card51 from '@/assets/cards/50.jpg';
import Card52 from '@/assets/cards/51.jpg';
import Card53 from '@/assets/cards/52.jpg';
import Card54 from '@/assets/cards/53.jpg';

export interface TaskType {
  id: string;
  imageUrl: string;
}

export interface ColumnType {
  id: string;
  title: string;
  taskIds: string[];
}

export interface InitialDataType {
  tasks: { [key: string]: TaskType };
  columns: { [key: string]: ColumnType };
  columnOrder: string[];
}

const cardItems = [
  Card1, Card2, Card3, Card4, Card5, Card6, Card7, Card8, Card9, Card10,
  Card11, Card12, Card13, Card14, Card15, Card16, Card17, Card18, Card19, Card20,
  Card21, Card22, Card23, Card24, Card25, Card26, Card27, Card28, Card29, Card30,
  Card31, Card32, Card33, Card34, Card35, Card36, Card37, Card38, Card39, Card40,
  Card41, Card42, Card43, Card44, Card45, Card46, Card47, Card48, Card49, Card50,
  Card51, Card52, Card53, Card54
];

const initialData: InitialDataType = {
  tasks: cardItems.reduce((acc, card, index) => {
    acc[`task-${index + 1}`] = { id: `task-${index + 1}`, imageUrl: card };
    return acc;
  }, {}),
  columns: {
    "column-1": {
      id: "column-1",
      title: "New Cards",
      taskIds: cardItems.map((_, index) => `task-${index + 1}`)
    },
    "column-2": {
      id: "column-2",
      title: "Sorted Cards",
      taskIds: []
    },
  },
  columnOrder: ["column-1", "column-2"]
};

export default initialData;
