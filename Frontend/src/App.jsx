import useLogin from "./Hooks/useLogin"

function App() {
  const { user } = useLogin("laouarmouaad@gmai.com", "123456789")
  console.log(user)
  return (
    <h1 className="text-3xl font-bold underline text-rose-500">
      Hello world!
    </h1>
  )
}

export default App