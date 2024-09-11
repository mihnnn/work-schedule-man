function WelcomeText({ nextStep }) {
    return (
        <div>
            <h2 className="text-3xl font-bold mb-4">Welcome to MyApp!</h2>
            <p className="mb-6">Let's get started by setting up your account.</p>
            <button className="btn bg-gray-200 text-black hover:opacity-70 hover:bg-gray-200 w-full hover:grow-0" onClick={nextStep}>Get Started</button>
        </div>
    )
}

export default WelcomeText
