export async function fetchUserRepos (user) {
  const apiUrl = `https://api.github.com/users/${user}/repos`

  try {
    const response = await fetch(apiUrl)

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.statusText}`)
    }

    const data = await response.json()

    // Map the repositories to objects containing name and link
    const repos = data.map(repo => ({
      name: repo.name
    }))

    return repos
  } catch (error) {
    console.error('Error fetching user repositories:', error)
    throw error
  }
}

export async function fetchRepoContents (user, repo) {
  const apiUrl = `https://api.github.com/repos/${user}/${repo}/contents`

  try {
    const response = await fetch(apiUrl)

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.statusText}`)
    }

    const data = await response.json()

    // Map the repositories to objects containing name and link
    const contents = data.map(content => ({
      name: content.name,
      download_url: content.download_url
    }))

    return contents
  } catch (error) {
    console.error('Error fetching user repositories:', error)
    throw error
  }
}

export async function fetchFileContents (download_url) {
  try {
    const response = await fetch(download_url)

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.statusText}`)
    }

    const data = await response.text()

    return data
  } catch (error) {
    console.error('Error fetching user repositories:', error)
    throw error
  }
}