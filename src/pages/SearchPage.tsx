import { useEffect, useState, useCallback, useRef } from 'react'
import { debounce } from 'lodash'
import { IUserData } from '../types/IUserData'
import UserSearchBlock from '../shared/UserSearchBlockItem/UserSearchBlock'
import MagnifiyingGlassMinusIcon from '../assets/Icons/MagnifiyingGlassMinusIcon'
import SearchIcon from '../assets/Icons/SearchIcon'

const SearchPage = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState<IUserData[] | null>(null)
  const sentinelRef = useRef<HTMLDivElement>(null)
  const searchLimitRef = useRef(6)

  const fetchUsers = async (query: string, limit: number) => {
    const response = await fetch(
      `http://localhost:8080/api/searchUsers?searchQuery=${query}&limit=${limit}`
    )
    const users = await response.json()
    setSearchResults(users)
  }

  const debouncedSearch = useCallback(debounce(fetchUsers, 700), [])

  useEffect(() => {
    searchLimitRef.current = 6
    if (searchQuery.trim().length > 0) {
      debouncedSearch(searchQuery, searchLimitRef.current)
    } else {
      setSearchResults(null)
    }
  }, [searchQuery, debouncedSearch])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          if (searchQuery.trim().length > 0) {
            searchLimitRef.current += 6
            debouncedSearch(searchQuery, searchLimitRef.current)
          }
        }
      },
      {
        threshold: 0.5,
      }
    )

    if (sentinelRef.current) {
      observer.observe(sentinelRef.current)
    }

    return () => observer.disconnect()
  }, [searchQuery, debouncedSearch])

  useEffect(() => {
    searchLimitRef.current = 6
    if (searchQuery.trim()) {
      debouncedSearch(searchQuery, searchLimitRef.current)
    }
  }, [searchQuery, debouncedSearch])

  return (
    <>
      <div className="flex flex-col items-center">
        <input
          name="searchQuery"
          placeholder="Search"
          type="text"
          className="mt-5 w-3/4 rounded-md border border-black bg-transparent px-4 py-2 text-black placeholder-black dark:border-white dark:text-white dark:placeholder-white md:w-1/2"
          onChange={(e) => setSearchQuery(e.target.value)}
        ></input>
        <div className="mt-4 flex max-h-[80vh] w-3/4 flex-col items-center overflow-y-auto md:max-h-[89vh]">
          {searchQuery.trim().length === 0 && (
            <p className="mt-10 flex w-full flex-col items-center justify-center text-xl text-black dark:text-white">
              <SearchIcon classNameProps="h-20 w-20 mb-5" />
              Enter username to search for users...
            </p>
          )}
          {searchResults?.length === 0 && searchQuery.trim().length > 0 ? (
            <p className="mt-10 flex w-full flex-col items-center justify-center text-xl text-black dark:text-white">
              <MagnifiyingGlassMinusIcon />
              There are no users with that username.
            </p>
          ) : (
            <>
              {searchResults?.map((user, index) => (
                <UserSearchBlock key={index} user={user} />
              ))}
              <div ref={sentinelRef} className="h-[1px] w-full"></div>
            </>
          )}
        </div>
      </div>
    </>
  )
}

export default SearchPage
