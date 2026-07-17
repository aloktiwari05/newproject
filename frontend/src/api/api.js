export const apiUrl = import.meta.env.VITE_API_URL;

export const refresh = async (setAccessToken, setIsLoading, setUser) => {

    try {
        const result = await fetch(`${apiUrl}/api/refresh`, { method: 'POST', credentials: 'include' })

        const data = await result.json()

        if (!result.ok) {
            setAccessToken(null);
            console.log(data.message);
            return;
        }

        setAccessToken(data.accessToken);
        setUser(data.user)
    }
    catch (err) {

        setAccessToken(null)
        console.log(err.message)

    } finally {
        setIsLoading(false)
    }
}
