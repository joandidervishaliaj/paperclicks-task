import { Button, Col, Container, Row } from "@nextui-org/react"
import { useState } from "react";
import StarredRepos from "./StarredRepos";

const Home = () => {
   const [isDataFetched, setIsDataFetched] = useState(false);

   return (
      <Container gap={0} align="center" css={{ marginTop: '70px' }}>
         <Row gap={1} css={{ width: "70%" }}>
            <Col>
               <Button 
               color='gradient' 
               auto 
               disabled={isDataFetched}
               css={{ marginBottom: '70px' }} 
               onPress={() => setIsDataFetched(true)}>
                    Fetch data
                </Button>
               <StarredRepos fetchData={isDataFetched} />
            </Col>
         </Row>
      </Container>
   )
}

export default Home