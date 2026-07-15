export const apiUrl = import.meta.env.VITE_API_URL;

export const refresh = async (setAccessToken, setIsLoading) => {

    try {
        const result = await fetch(`${apiUrl}/api/refresh`, { method: 'POST', credentials: 'include' })

        if (result.ok) {
            const data = await result.json()
            setAccessToken(data.accessToken)
        }
    }
    catch (err) {

        console.log(err.message)

    } finally {
        setIsLoading(false)
    }
}
