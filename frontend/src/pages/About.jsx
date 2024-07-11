import React from "react";
import { Helmet } from "react-helmet";
import "./styles/about.css";

const About = () => {
  return (
    <>
      <Helmet>
        <title>ADAS - About</title>
        <meta name="description" content="Home Page" />
      </Helmet>

      <section className="about-main">
        <h2 className="title">ADAS Website Team</h2>
        <section className="cards" id="skills">
          <div className="content">
            <div className="card">
              <div className="icon">
                <i className="fa-brands fa-figma"></i>
              </div>
              <div className="info">
                <h3>Mohammed El-Sayed</h3>
                <p>UI/UX Developer</p>
              </div>
              <div className="social-links">
            <a href="#" target="_blank"><i className="fab fa-facebook-f"></i></a>
            <a href="#" target="_blank"><i className="fa-brands fa-github"></i></a>
            <a href="#" target="_blank"><i className="fa-brands fa-linkedin"></i></a>
        </div>
            </div>
          </div>
          <div className="content">
            <div className="card">
              <div className="icon">
                <i className="fa-brands fa-css3"></i>
              </div>
              <div className="info">
                <h3>Mahmoud Magdy</h3>
                <p>Front-End Developer</p>
              </div>
              <div className="social-links">
            <a href="#" target="_blank"><i className="fab fa-facebook-f"></i></a>
            <a href="#" target="_blank"><i className="fa-brands fa-github"></i></a>
            <a href="#" target="_blank"><i className="fa-brands fa-linkedin"></i></a>
        </div>
            </div>
          </div>
          <div className="content">
            <div className="card">
              <div className="icon">
                <i className="fa-brands fa-js"></i>
              </div>
              <div className="info">
                <h3>Amr Hossam</h3>
                <p>Back-End Developer</p>
              </div>
              <div className="social-links">
            <a href="#" target="_blank"><i className="fab fa-facebook-f"></i></a>
            <a href="#" target="_blank"><i className="fa-brands fa-github"></i></a>
            <a href="#" target="_blank"><i className="fa-brands fa-linkedin"></i></a>
        </div>
            </div>
          </div>
        </section>
      </section>

      {/* <section>
    <Footer/>
    </section> */}
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

export default About;
