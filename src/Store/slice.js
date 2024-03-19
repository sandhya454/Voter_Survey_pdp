// redux/slice.js
import { createSlice } from '@reduxjs/toolkit';

export const membersSlice = createSlice({
  name: 'members',
  initialState: {
    selectedMembers: [],
    voterList:[],
    addMembersList:[]
  },
  reducers: {
    addSelectedMember: (state, action) => {
      state.selectedMembers.push(action.payload);
    },
    removeSelectedMember: (state, action) => {
      state.selectedMembers = state.selectedMembers.filter((name) => name !== action.payload);
    },
    resetSelectedMembers: (state) => {
        state.selectedMembers = [];
      },
      addVoterList:(state,action)=>{
        state.voterList=action.payload
      },
      addMembersVoterList:(state,action)=>{
        state.addMembersList=action.payload
      },
      resetVoterList: (state) => {
        state.voterList = [];
      },

  },
});

export const { addSelectedMember, removeSelectedMember,resetSelectedMembers,addVoterList,resetVoterList,addMembersVoterList } = membersSlice.actions;

export const selectSelectedMembers = (state) => state.members.selectedMembers;
export const selectVoterList = (state) => state.members.voterList;
export const selectAddMembersVoterList = (state) => state.members.addMembersList;

export default membersSlice.reducer;
