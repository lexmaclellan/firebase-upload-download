import './App.css'
import { useState, useEffect } from 'react'
import { storage, db } from './firebase'
import { ref, uploadBytes, listAll, getDownloadURL } from 'firebase/storage'
import { getDocs, addDoc, collection, doc } from 'firebase/firestore'
import { v4 } from 'uuid'

function App() {
  const [recordName, setRecordName] = useState('')
  const [recordText, setRecordText] = useState('')
  const [storedRecords, setStoredRecords] = useState([])
  const [fileUpload, setFileUpload] = useState(null)
  const [fileList, setFileList] = useState([])
  const fileListRef = ref(storage, 'images/')

  /* Save to Firestore */
  const handleTextForm = async (e) => {
    e.preventDefault()

    const docRef = await addDoc(collection(db, 'recordsCollection'), {
      name: recordName,
      text: recordText
    })
  }

  const handleRecordsForm = async (e) => {
    e.preventDefault()

    const querySnapshot = await getDocs(collection(db, 'recordsCollection'))
    const recs = []
    querySnapshot.forEach((doc) => {
      recs.push(Object.values(doc.data()))
    })
    setStoredRecords(recs)
  }

  /* Save to Storage */
  const handleFileForm = (e) => {
    e.preventDefault()
    if (fileUpload === null) return

    const imageRef = ref(storage, `images/${fileUpload.name + v4()}`)
    uploadBytes(imageRef, fileUpload).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        setFileList((prev) => [...prev, url])
      })
    })
  }

  /* useEffects - Execute on page load */
  useEffect(() => {
    listAll(fileListRef).then((res) => {
      res.items.forEach((item) => {
        getDownloadURL(item).then((url) => {
          setFileList((prev) => [...prev, url])
        })
      })
    })
  }, [])

  /* HTML layout */
  return (
    <div className='App'>
      <h1>Firebase Sample</h1>
      <form onSubmit={handleTextForm}>
        <label htmlFor='record-name'>Record Name:</label>
        <input
          type='text'
          id='record-name'
          name='record-name'
          value={recordName}
          onChange={(e) => setRecordName(e.target.value)}
        /><br />
        <label htmlFor='record-text'>Record Text:</label>
        <textarea
          id='record-text'
          name='record-text'
          value={recordText}
          onChange={(e) => setRecordText(e.target.value)}
        >
        </textarea><br />
        <button>
          Save
        </button>
      </form>
      <form onSubmit={handleRecordsForm}>
        <button>
          Load Records
        </button>
        <br />
        <div>
          {storedRecords.map((item, index) => {
            <div key={index}>
              {console.log(item[0] + ": " + item[1])}
              <div className='bold'>{item[0]}</div>
              <div>{item[1]}</div>
            </div>
          })}
        </div>
      </form>

      <form onSubmit={handleFileForm}>
        <input
          type='file'
          onChange={(e) => { setFileUpload(e.target.files[0]) }}
        />
        <button>
          Submit
        </button>
      </form>
      <div>
        {fileList.map((url, index) => {
          return (
            <div key={index}>
              <img src={url} className='image' />
              <a href={url} download={url}>
                <button>Download</button>
              </a>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default App