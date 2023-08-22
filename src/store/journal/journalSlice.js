import { createSlice } from '@reduxjs/toolkit';

export const journalSlice = createSlice({
    name: 'journal',
    initialState: {
        isSaving: false,
        mesaggeSaved: '',
        notes: [],
        active: null,
        // active: {
        //   id: 'ABC123',
        //   title: '',
        //   body: '',
        //   date: 1234567,
        //   imageUrls: [],
        // }
    },
    reducers: {
      savingNewNote: ( state ) => {
        state.isSaving = true;
      },
      addNewEmptyNote: ( state, action ) => {
        state.notes.push( action.payload );
        state.isSaving = false;
      },
      setActiveNote: ( state, action ) => {
        state.active = action.payload;
        state.mesaggeSaved = '';
      },
      setNotes: ( state, action ) => {
        state.notes = action.payload ;
      },
      setSaving: ( state ) => {
        state.isSaving = true;
        state.mesaggeSaved = '';
      },
      updateNote: ( state, action ) => {
        state.isSaving = false;
        state.notes = state.notes.map( note => {

          if ( note.id === action.payload.id ) {
            return action.payload;
          }

          return note;
        });

        state.mesaggeSaved = `${ action.payload.title }, actualizada correctamente `;
        
      },
      deleteNoteById: ( state, action ) => {

      },
    }
});

export const { 
  savingNewNote,
  addNewEmptyNote,
  setActiveNote,
  setNotes,
  setSaving,
  updateNote,
  deleteNoteById, 
} = journalSlice.actions;