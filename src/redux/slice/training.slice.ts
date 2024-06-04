import { createSlice } from "@reduxjs/toolkit";

type TRandomWords = {
    dictionary: string
    transcription: string
    translation: string
    association: string
    dependentCcondition: string
}
type TUserIpnutWords = {
  dictionary: string
  translation: string
}
interface  TFaceAndNames {
  image: string
  name: string
}
interface TUserInputNames{
  correctName: string,
  userInputName: string
}
// Define the state type
interface INumberState {
  randomNumbers: number[];
  userInputNumbers: number[]
  randomWords: TRandomWords[]
  userInputWords: TUserIpnutWords[]
  randomFaces: TFaceAndNames[]
  userInputNames: TUserInputNames[]
  userReadTime: number
  isProcess: boolean;
  systemTime: number;
  system: number;
  userInputTime: number
}

// Define the initial state with the correct type
const initialState: INumberState = {
  randomNumbers: [],
  userInputNumbers: [],
  randomWords: [],
  userInputWords: [],
  randomFaces: [],
  userInputNames: [],
  userReadTime: 0,
  isProcess: false,
  systemTime: 0,
  system: 2,
  userInputTime: 0,
};

export const numberSlice = createSlice({
  name: "Number",
  initialState,
  reducers: {
    processPending: (state, action)=>{
      state.systemTime = action.payload.systemTime ? action.payload.systemTime : 5
      state.system = action.payload.system ? action.payload.system : 2
    },
    processStarted: (state, action) => {
      state.isProcess = true;
      state.randomNumbers = action.payload.randomNumbers ? action.payload.randomNumbers : []
      state.randomWords = action.payload.randomWords ? action.payload.randomWords : []
      state.randomFaces = action.payload.randomFaces ? action.payload.randomFaces : []
    },
    userReadFinishing: (state, action)=>{
      state.userReadTime = action.payload
    },
    processFinished: (state, action)=>{
      state.isProcess = false
      state.userInputNumbers = action.payload.userInputNumbers ? action.payload.userInputNumbers : []
      state.userInputWords = action.payload.userInputWords ? action.payload.userInputWords : []
      state.userInputNames = action.payload.userInputNames ? action.payload.userInputNames : []
      state.userInputTime = action.payload.userInputTime
    },
  },
});

export const {
  processStarted,
  processFinished,
  processPending,
  userReadFinishing
} = numberSlice.actions;
export default numberSlice.reducer;
