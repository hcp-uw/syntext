import './GithubSearchPopup.css'
import { useState } from 'react'
import axios from 'axios';


const SearchResult = props => {
    const { searchResult } = props

    let result = searchResult.result
    if (result === undefined) return (
        <div className='search-result'>
            <h1>no results found</h1>
        </div>
    )

    return (
        <div className='search-result'>
            {result.split('\r\n').slice(0, 4).map((line, i) =>
                line === ""
                    ? (
                    <div key={i} className='search-result-line'>
                        <br/>
                    </div>
                    )
                    : (
                    <div key={i} className='search-result-line'>
                        {line}
                    </div>
            )
            )}
            <div>...</div>
        </div>
    )
}

const parseSearchResult = result => {
    const lineSeperator = result.indexOf('\r\n') !== -1 ? '\r\n' : '\n'

    return result.split(lineSeperator);
}

const GithubSearchPopup = props => {
  const { setGithubFocus, setDefaultSnippet, defaultSnippet } = props

  const [githubUsername, setGithubUsername] = useState('')
    const [githubRepo, setGithubRepo] = useState('')
    const [githubBranch, setGithubBranch] = useState('')
    const [githubFile, setGithubFile] = useState('')

    const [searchResult, setSearchResult] = useState(undefined)

    const searchGithub = async () => {
        try {
            const res = await axios.get(
                `https://raw.githubusercontent.com/${githubUsername}/${githubRepo}/${githubBranch}/${githubFile}`
            )

            if (res.status === 200) {
                return { result: res.data }
            }

            return { result: undefined }
        } catch (e) {
            return { result: undefined }
        }
    }



  return (
    <>
      <div
        className='black-shade'
        onClick={() => setGithubFocus(false)}
      ></div>
      <div className='github-search-container'>
        <h1>search for a file on github</h1>
        <div className='search-input-container'>
            <input
                type='text'
                placeholder='github username'
                value={githubUsername}
                onChange={(e) => setGithubUsername(e.target.value)}
            />
            <input
                type='text'
                placeholder='repository name'
                value={githubRepo}
                onChange={(e) => setGithubRepo(e.target.value)}
            />
            <input
                type='text'
                placeholder='branch name'
                value={githubBranch}
                onChange={(e) => setGithubBranch(e.target.value)}
            />
            <input
                type='text'
                placeholder='file name'
                value={githubFile}
                onChange={(e) => setGithubFile(e.target.value)}
            />
        </div>

        {searchResult !== undefined && <SearchResult searchResult={searchResult}/>}
        {searchResult !== undefined && searchResult.result !== undefined && (
            <div className="use-result-container">
                <button
                    onClick={() => {
                        setDefaultSnippet(
                            { ...defaultSnippet, data: parseSearchResult(searchResult.result) }
                        )
                        setGithubFocus(false)
                    }}
                >
                    use this result
                </button>
            </div>
        )}

        <div className='search-button-container'>
            <button
                onClick={async () => {
                    setSearchResult(await searchGithub())
                }}
            >
                search
            </button>
        </div>

      </div>
    </>
  )
}

export default GithubSearchPopup
