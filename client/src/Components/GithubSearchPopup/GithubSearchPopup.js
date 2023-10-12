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
            {result.replace('\r\n', '\n').split('\n').slice(0, 4).map((line, i) =>
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

const estimateTabWidth = (inputCode) => {
    const lines = inputCode.split(/\r\n|\r|\n/);

    // Count the frequency of different space widths at the beginning of lines
    const spaceWidthsCount = {};
    lines.forEach(line => {
        const leadingSpaces = line.match(/^ +/);
        if (leadingSpaces) {
            const spacesCount = leadingSpaces[0].length;
            if (spaceWidthsCount[spacesCount]) {
                spaceWidthsCount[spacesCount]++;
            } else {
                spaceWidthsCount[spacesCount] = 1;
            }
        }
    });

    // Find the most common space width
    let maxCount = 0;
    let mostCommonWidth = 0;
    Object.keys(spaceWidthsCount).forEach(width => {
        const count = spaceWidthsCount[width];
        if (count > maxCount) {
            maxCount = count;
            mostCommonWidth = parseInt(width);
        }
    });

    return mostCommonWidth;
}

const parseSearchResult = inputCode => {
    // Detect the existing line separator
    const lineSeparator = inputCode.includes('\r\n') ? '\r\n' : '\n';

    // Replace line separators with '\n'
    let formattedCode = inputCode.replace(/\r\n|\r|\n/g, '\n');

    // Detect the width of spaces (number of spaces until the first non-space character)
    const spaceWidth = (line) => {
        const leadingSpaces = line.match(/^ */)[0];
        return leadingSpaces.length;
    };

    const tabWidth = estimateTabWidth(inputCode);

    // Convert spaces to tabs based on the detected width
    return formattedCode.split('\n').map(line => {
        const spaces = spaceWidth(line);
        const tabsCount = Math.floor(spaces / tabWidth);
        const remainingSpaces = spaces % tabWidth;
        const tabs = '\t'.repeat(tabsCount);
        const spacesString = ' '.repeat(remainingSpaces);
        return tabs + spacesString + line.trim();
    });
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
        <p>This will not be a ranked game. This feature is experimental and may not properly parse user generated code.</p>
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
