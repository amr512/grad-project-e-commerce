import { Card, CardBody, Heading, Image, Stack, Text } from "@chakra-ui/react";
import React from "react";
import { API_URL } from "../helpers/constants";

const Home = () => {
  return (
    <div className="page">
    <Card alignItems={"center"}  className="main" backgroundSize={"cover"} backgroundPosition={"center"} backgroundImage={API_URL + "/images/home1.png"} minH={"100vh"} minW={"100vw"} overflow={"hidden"}>  
    <CardBody>

      <Stack>

        <h2>
          Redefining the Road<br /><span
            >Explore the Future of Transportation</span
          >
        </h2>
            </Stack>
            </CardBody>

    </Card>
      <Card margin={"2vw"} direction={{ base: "column", lg: "row" }} overflow={"hidden"}>
        <Image src={API_URL + "/images/img1.jpg"} alt="pic1" />
        <Stack >
          <CardBody fontSize={"lg"} alignContent={"center"} >
            <Heading size="lg" color={"blue.300"}>Brief</Heading>
            <Text>
              The primary objective of the AI self-driving car project is to
              design, develop, and validate a safe and reliable autonomous
              vehicle system that enhances transportation efficiency, reduces
              accidents, and provides a comfortable and convenient mode of
              transportation for users.
            </Text>
          </CardBody>
        </Stack>
      </Card>
    </div>
  );
};

export default Home;
