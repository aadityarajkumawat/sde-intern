import { useEffect, useState } from 'react'
import { tasty } from 'tastycss'
import { SearchBar } from './components/searchbar'
import { v4 as uuid } from 'uuid'
import { useDebounce } from './hooks/useDebounce'
import { splitArray } from './helpers/splitArray'
import { Image } from './components/image'

const Flex = tasty({
  as: 'div',
  styles: {
    display: 'flex',
  },
  styleProps: ['textAlign', 'flexDirection'],
})

const Heading = tasty({
  as: 'h1',
  styles: {
    width: '100%',
    fontSize: '50px',
    fontFamily: 'Montserrat',
  },
  styleProps: ['fontWeight', 'padding'],
})

type LocalAppState = {
  search: string
  images: Array<string>
  loadingImages: boolean
  searchResults: Array<string>
  page: number
  searchResultPage: number
}

const CLIENT_ID = 'DpnQvuq5omDfBSpCt5rgO8J6jFgr4DG6RHwHDpWG7h8'
const PER_PAGE = 30

function App() {
  const [localApp, setLocalApp] = useState<LocalAppState>({
    search: '',
    images: [],
    searchResults: [],
    loadingImages: false,
    page: 0,
    searchResultPage: 0,
  })

  const query = useDebounce(localApp.search)

  function updateState(update: Partial<LocalAppState>) {
    setLocalApp((ls) => ({ ...ls, ...update }))
  }

  async function loadSearchResults() {
    if (localApp.loadingImages) {
      return []
    }

    updateState({ loadingImages: true })
    console.log('searching', query)

    const res = await fetch(
      `https://api.unsplash.com/search/photos?page=${
        localApp.searchResultPage + 1
      }&query=${query}&per_page=${PER_PAGE}`,
      {
        headers: { Authorization: `Client-ID ${CLIENT_ID}` },
      },
    )

    const body = await res.json()
    const images = body.results.map((i: any) => i.urls.regular) as Array<string>

    console.log('searched', images)
    setLocalApp((ls) => ({
      ...ls,
      loadingImages: false,
      searchResultPage: ls.searchResultPage + 1,
    }))
    return images
  }

  async function loadImages() {
    if (localApp.loadingImages) {
      return []
    }

    updateState({ loadingImages: true })
    const res = await fetch(
      `https://api.unsplash.com/photos?per_page=${PER_PAGE}&page=${
        localApp.page + 1
      }`,
      {
        headers: { Authorization: `Client-ID ${CLIENT_ID}` },
      },
    )

    const body = await res.json()
    const images = body.map((i: any) => i.urls.regular) as Array<string>
    setLocalApp((ls) => ({ ...ls, loadingImages: false, page: ls.page + 1 }))
    return images
  }

  function getImages() {
    return !!query ? localApp.searchResults : localApp.images
  }

  function getPage() {
    return !!query ? localApp.searchResultPage : localApp.page
  }

  async function handleScroll(e: React.UIEvent<HTMLDivElement, UIEvent>) {
    const target = e.target as any

    const toScroll = target.scrollHeight
    const height = window.innerHeight
    const top = target.scrollTop
    const bottom = toScroll - height - top

    if (bottom < toScroll / 9) {
      let images: Array<string> = []
      if (!!query) {
        images = await loadSearchResults()
        setLocalApp((ls) => ({
          ...ls,
          searchResults: [...images],
        }))
      } else {
        images = await loadImages()
        setLocalApp((ls) => ({ ...ls, images: [...ls.images, ...images] }))
      }
    }
  }

  useEffect(() => {
    async function getPhotos() {
      const images = await loadImages()
      setLocalApp((ls) => ({ ...ls, images: [...ls.images, ...images] }))
    }

    getPhotos()
  }, [])

  useEffect(() => {
    if (query === '') {
      updateState({ searchResultPage: 0, searchResults: [] })
      return
    }

    async function getPhotos() {
      const images = await loadSearchResults()
      setLocalApp((ls) => ({
        ...ls,
        searchResults: [...images],
      }))
    }

    getPhotos()
  }, [query])

  return (
    <div
      style={{ overflowY: 'scroll', height: '100%' }}
      onScroll={handleScroll}
    >
      <Flex textAlign='center' flexDirection='column'>
        <Heading fontWeight='300' padding='2rem 0 0 0'>
          Galleria
        </Heading>
        <p>Find the perfect image</p>

        <SearchBar
          value={localApp.search}
          onChange={(text) => setLocalApp((ls) => ({ ...ls, search: text }))}
        />
      </Flex>

      <div className='image-gallery'>
        <div className='column'>
          {splitArray(getImages(), getPage(), 1).map((src) => (
            <Image key={uuid()} src={src} />
          ))}
        </div>
        <div className='column'>
          {splitArray(getImages(), getPage(), 2).map((src) => (
            <Image key={uuid()} src={src} />
          ))}
        </div>
        <div className='column'>
          {splitArray(getImages(), getPage(), 3).map((src) => (
            <Image key={uuid()} src={src} />
          ))}
        </div>
      </div>
      {localApp.loadingImages && <div>loadimg...</div>}
    </div>
  )
}

export default App
