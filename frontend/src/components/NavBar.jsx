import {
  Tabs,
  Tab,
  TabList,
  Heading,
  localStorageManager,
  IconButton,
  ColorModeContext,
  useColorMode,
  Spacer,
  Stack,
} from "@chakra-ui/react";
import { SunIcon, MoonIcon } from "@chakra-ui/icons";
import "./styles/navbar.css";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

export default function NavBar() {
  const { colorMode, toggleColorMode } = useColorMode();
    const [tabIndex, setTabIndex] = useState()
    const location = useLocation();

    useEffect(() => {
      console.log(location);
        if(location.pathname === '/'){
            setTabIndex(0)
        }else if(location.pathname === '/products'){
            setTabIndex(1)
        }

    },[location])

  return (
    <div className="navbar">
      {/* brand name to the left */}
      <Heading textAlign="start">Grad Project</Heading>
      {/* navbar and color mode button to the right */}
      <Stack direction={"row"}>
        
          <IconButton
            borderRadius={"full"}
            aria-label="Toggle Color Mode"
            onMouseUp={(e) => {
              e.preventDefault();
              toggleColorMode();
              console.log(colorMode);
            }}
            icon={colorMode === "dark" ? <SunIcon /> : <MoonIcon />}
          />
        <Tabs index={tabIndex} textAlign="end" variant={"soft-rounded"}>
          <TabList gap={'0.5vw'}>
            <Link to="/">
              <Tab id="/">Home</Tab>
            </Link>
            <Link to="/products">
              <Tab id="/products">Products</Tab>
            </Link>
            <Tab>Cart</Tab>
          </TabList>
        </Tabs>
      </Stack>
    </div>
  );
}
