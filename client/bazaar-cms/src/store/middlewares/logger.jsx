const logger = store => next => action => {

  // console.log sblm dispatch dijalankan
  console.log('Mau dispatch action', action)
  console.log('Sebelum action', store.getState())

  //dispatch action jalan
  next(action)

  //hasil dari perubahan yg dilakukan action
  console.log('Hasil dari action', store.getState())
} // currying

export default logger

