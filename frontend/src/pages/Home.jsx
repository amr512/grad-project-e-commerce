import React from "react";
import { Helmet } from "react-helmet";
import banner from "../images/new vehicle.jpg";
import "./styles/home.css";
import { auth } from "../main";
const Home = () => {
  
  return (
    <>
      <Helmet>
        <title>ADAS - Home</title>
        <meta name="description" content="Home Page" />
      </Helmet>


      <section className="main">
        <div>
        <h2>Redefining the Road</h2>
        <h3>Explore the future of Transportation</h3>
        <a href="#" className="main-btn">Shop Now</a>
        </div>
    
    </section>

    <section className="brief">
        <div className="brief-content">
            <h2>Our Vision</h2>
            <p>ADAS Cars is committed to revolutionizing the automotive industry with innovative technology and cutting-edge design. Our mission is to create vehicles that are not only safe and reliable but also offer an unparalleled driving experience.</p>
        </div>
    </section>
    </>

    //#region old code
    //   <div className="page">
    //     <Card
    //       minH={"100vh"}
    //       minW={"100vw"}
    //       borderRadius={"0"}
    //       backgroundImage={home1}
    //       backgroundPosition={"center"}
    //       backgroundSize={"cover"}
    //     >
    //       <CardBody alignContent={"center"}>
    //         <Stack textAlign={"start"} paddingStart={"5vw"}>
    //           <Heading size={"lg"} color={"#96535b"}>
    //             Redefining the Road
    //             <br />
    //             <span style={{ color: "#272034" }}>
    //               Explore the Future of Transportation
    //             </span>
    //           </Heading>
    //         </Stack>
    //       </CardBody>
    //     </Card>
    //     <Stack direction={{ base: "column", lg: "row" }} padding={"2vw"} gap={"2vw"}>
    //       <Card
    //         direction={{ base: "column", lg: "row" }}
    //         overflow={"hidden"}

    //         >
    //         <Image src={image1} />
    //         <Stack

    //         >
    //           <CardBody fontSize={"lg"} alignContent={"center"}>
    //             <Heading size="lg" color={"blue.300"}>
    //               Brief
    //             </Heading>
    //             <Text>
    //               The primary objective of the AI self-driving car project is to
    //               design, develop, and validate a safe and reliable autonomous
    //               vehicle system that enhances transportation efficiency, reduces
    //               accidents, and provides a comfortable and convenient mode of
    //               transportation for users.
    //             </Text>
    //           </CardBody>
    //         </Stack>
    //       </Card>
    //             </Stack>
    //   </div>
    //#endregion old code
  );
};

export default Home;
