import {
  DrawerContent,
  IconButton,
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  useDisclosure,
  DrawerOverlay,
  Drawer,
  DrawerBody, Divider,
} from "@chakra-ui/react"
import Futures from "./Futures"
import Options from "./Options"
import Users from "./Users"
import logo from "../assets/svg/logo.svg";
import smallLogo from "../assets/svg/small-logo.svg"
import {useState} from "react";
import useWindowDimensions from "../hooks/useWindowDimensions";
import {HamburgerIcon, CloseIcon} from "@chakra-ui/icons";
import Swap from "./Swap";

const App = () => {
  const [index, setIndex] = useState(0)
  const {isOpen, onOpen, onClose} = useDisclosure()

  const handleTabsChange = (index: number) => {
    setIndex(index)
  }

  const {width} = useWindowDimensions()

  return (
    <Tabs isLazy size={"lg"} index={index} onChange={handleTabsChange} variant={"unstyled"}>
      {width >= 1000 ? (
        <TabList alignItems={"center"} h={"66px"}>
          <Stack w={"100%"} h={"66px"} justifyContent={"center"} spacing={0}>
            <Stack pl={["22px", "22px", "44px"]} direction={"row"} spacing={4} position={"absolute"}>
              <img src={logo} alt={"logo"}/>
            </Stack>
            <Stack justifyContent={"center"} direction={"row"} w={"100%"} spacing={0}>
              <Tab h={"66px"} p={0}>
                <Stack borderBottom={"2px"} borderColor={index === 0 ? "hedge": "white"} h={"66px"} w={"120px"} justifyContent={"center"}>
                  <Text color={index === 0 ? "hedge" : "black"} fontSize={"16px"} fontWeight={index === 0 ? 700 : 500} fontFamily={"Montserrat"}>Futures</Text>
                </Stack>
              </Tab>
              <Tab h={"66px"} p={0}>
                <Stack borderBottom={"2px"} borderColor={index === 1 ? "hedge": "white"} h={"66px"} w={"120px"} justifyContent={"center"}>
                  <Text color={index === 1 ? "hedge" : "black"} fontSize={"16px"} fontWeight={index === 1 ? 700 : 500} fontFamily={"Montserrat"}>Options</Text>
                </Stack>
              </Tab>
              <Tab h={"66px"} p={0}>
                <Stack borderBottom={"2px"} borderColor={index === 2 ? "hedge": "white"} h={"66px"} w={"120px"} justifyContent={"center"}>
                  <Text color={index === 2 ? "hedge" : "black"} fontSize={"16px"} fontWeight={index === 2 ? 700 : 500} fontFamily={"Montserrat"}>User</Text>
                </Stack>
              </Tab>
              <Tab h={"66px"} p={0}>
                <Stack borderBottom={"2px"} borderColor={index === 3 ? "hedge": "white"} h={"66px"} w={"120px"} justifyContent={"center"}>
                  <Text color={index === 2 ? "hedge" : "black"} fontSize={"16px"} fontWeight={index === 3 ? 700 : 500} fontFamily={"Montserrat"}>Swap</Text>
                </Stack>
              </Tab>
            </Stack>
            <Divider/>
          </Stack>
        </TabList>
      ) : (
        <Stack w={"100%"} alignItems={"center"} spacing={0}>
          <Stack direction={"row"} alignItems={"center"} px={2} w={"100%"}>
            <IconButton aria-label="Search database" icon={<HamburgerIcon/>}
                        variant={"ghost"} position={"absolute"} onClick={onOpen}/>
            <Stack direction={"row"} alignItems={"center"} justifyContent={"center"} w={"100%"} h={"64px"}>
              <img src={smallLogo} alt={"logo"}/>
            </Stack>
          </Stack>
          <Divider/>
          <Drawer placement={"top"} onClose={onClose} isOpen={isOpen}>
            <DrawerOverlay/>
            <DrawerContent>
              <DrawerBody>
                <Stack direction={"row"} alignItems={"center"} w={"100%"}>
                  <IconButton aria-label="Search database" icon={<CloseIcon/>} color={"hedge"}
                              variant={"ghost"} position={"absolute"} onClick={onClose}/>
                  <Stack direction={"row"} alignItems={"center"} justifyContent={"center"} w={"100%"} h={"64px"}>
                    <img src={smallLogo} alt={"logo"}/>
                  </Stack>
                </Stack>
                <TabList>
                  <Stack py={"44px"} w={"100%"} alignItems={"center"}>
                    <Tab h={"66px"} p={0} w={"120px"}>
                      <Stack borderBottom={"2px"} borderColor={index === 0 ? "hedge": "white"} h={"66px"} w={"120px"} justifyContent={"center"}>
                        <Text color={index === 0 ? "hedge" : "black"} fontSize={"16px"} fontWeight={index === 0 ? 700 : 500} fontFamily={"Montserrat"}>Futures</Text>
                      </Stack>
                    </Tab>
                    <Tab h={"66px"} p={0} w={"120px"}>
                      <Stack borderBottom={"2px"} borderColor={index === 1 ? "hedge": "white"} h={"66px"} w={"120px"} justifyContent={"center"}>
                        <Text color={index === 1 ? "hedge" : "black"} fontSize={"16px"} fontWeight={index === 1 ? 700 : 500} fontFamily={"Montserrat"}>Options</Text>
                      </Stack>
                    </Tab>
                    <Tab h={"66px"} p={0} w={"120px"}>
                      <Stack borderBottom={"2px"} borderColor={index === 2 ? "hedge": "white"} h={"66px"} w={"120px"} justifyContent={"center"}>
                        <Text color={index === 2 ? "hedge" : "black"} fontSize={"16px"} fontWeight={index === 2 ? 700 : 500} fontFamily={"Montserrat"}>User</Text>
                      </Stack>
                    </Tab>
                    <Tab h={"66px"} p={0} w={"120px"}>
                      <Stack borderBottom={"2px"} borderColor={index === 3 ? "hedge": "white"} h={"66px"} w={"120px"} justifyContent={"center"}>
                        <Text color={index === 2 ? "hedge" : "black"} fontSize={"16px"} fontWeight={index === 3 ? 700 : 500} fontFamily={"Montserrat"}>Swap</Text>
                      </Stack>
                    </Tab>
                  </Stack>
                </TabList>
              </DrawerBody>
            </DrawerContent>
          </Drawer>
        </Stack>
      )}
      <TabPanels>
        <TabPanel p={0}>
          <Futures/>
        </TabPanel>
        <TabPanel p={0}>
          <Options/>
        </TabPanel>
        <TabPanel p={0}>
          <Users/>
        </TabPanel>
        <TabPanel p={0}>
          <Swap/>
        </TabPanel>
      </TabPanels>
    </Tabs>
  )
}

export default App
