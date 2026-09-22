import images from "../assets/oogway.jpg";

const Home = () => {
  return (
    <div>Home
        <h2>Welcome to first component</h2>
        <img
        src={images}
        alt="My Image"
        width="400"
      />
    </div>
  )
}

export default Home