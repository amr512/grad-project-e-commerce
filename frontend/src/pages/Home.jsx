import {
  Card,
  CardBody,
  Heading,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { API_URL } from "../helpers/constants";

const Home = () => {
  return (
    <div className="page">
      <Card
        minH={"100vh"}
        minW={"100vw"}
        borderRadius={"0"}
        backgroundImage={"/src/media/home1.png"}
        backgroundPosition={"center"}
        backgroundSize={"cover"}
      >
        <CardBody alignContent={"center"}>
          <Stack textAlign={"start"} paddingStart={"5vw"}>
            <Heading size={"lg"} color={"#96535b"}>
              Redefining the Road
              <br />
              <span style={{ color: "#272034" }}>
                Explore the Future of Transportation
              </span>
            </Heading>
          </Stack>
        </CardBody>
      </Card>
      <Stack direction={{ base: "column", lg: "row" }} padding={"2vw"} gap={"2vw"}>
        <Card
          direction={{ base: "column", lg: "row" }}
          overflow={"hidden"}
          
          >
          <Image src={"/src/media/img1.jpg"} />
          <Stack
          
          >
            <CardBody fontSize={"lg"} alignContent={"center"}>
              <Heading size="lg" color={"blue.300"}>
                Brief
              </Heading>
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
              </Stack>
    </div>
  );
};

export default Home;
