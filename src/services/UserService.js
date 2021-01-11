import firebase from './firebase'

const ref = firebase.firestore().collection('user')

export const saveDataUser = (data) => {
    let response
    ref.add({
        name: data.name,
        description: data.description,
        status: data.status,
    }).then((docRef) => {
        response = 'Data Berhasil Disimpan'
    })
        .catch((error) => {
            console.log('Save Data Error ' + error)
            response = 'Data Gagal Tersimpan'
        })

    return response
}
