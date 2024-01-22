import './App.css'
import { useState, useEffect } from 'react'
import { storage } from './firebase'
import { ref, uploadBytes, listAll, getDownloadURL } from 'firebase/storage'
import { v4 } from 'uuid'

function App() {
  const [fileUpload, setFileUpload] = useState(null)
  const [fileList, setFileList] = useState([])
  const fileListRef = ref(storage, 'images/')

  const handleForm = (e) => {
    e.preventDefault()
    if (fileUpload === null) return

    const imageRef = ref(storage, `images/${ fileUpload.name + v4()}`)
    uploadBytes(imageRef, fileUpload).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        setFileList((prev) => [...prev, url])
      })
    })
  }

  useEffect(() => {
    listAll(fileListRef).then((res) => {
      res.items.forEach((item) => {
        getDownloadURL(item).then((url) => {
          setFileList((prev) => [...prev, url])
        })
      })
    })
  }, [])

  return (
    <>
      <form onSubmit={handleForm}>
        <input
          type='file'
          onChange={(e) => { setFileUpload(e.target.files[0]) }}
        />
        <button>
          Submit
        </button>
      </form>
      {fileList.map((url) => {
        return (
          <>
            <img src={url} className='image' />
            <a href={url} download={url}>
              <button>Download</button>
            </a>
          </>
        )
      })}
    </>
  )
}

export default App