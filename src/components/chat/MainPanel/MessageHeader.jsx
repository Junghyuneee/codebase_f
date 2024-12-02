import {
    Accordion,
    Button,
    Card,
    Col,
    Container,
    Form,
    FormControl,
    Image,
    InputGroup,
    Row,
    useAccordionButton
} from "react-bootstrap"
import {FaLock} from "react-icons/fa"
import {MdFavorite} from 'react-icons/md'
import {AiOutlineSearch} from 'react-icons/ai'
import {leaveChatroom} from "@/api/chat/chatroom.js";
import PropTypes from "prop-types";

function MessageHeader({chatRoom, setChatRoom}) {

    const leaveChatRoom = async () => {
        return await leaveChatroom(chatRoom.id);
    }

    const handleLeaveChatRoom = () => {
        if (window.confirm("채팅방을 나가시겠습니까?")) {
            if (leaveChatRoom()) {
                window.alert("채팅방을 나갔습니다.");
                setChatRoom(null);
            }

        }
    }

    // const CustomToggle = ({ children, eventKey }) => {
    //   const decoratedOnClick = useAccordionButton(eventKey, () => {});
    //
    //   return (
    //     <Button
    //       type="button"
    //       style={{ border: 'none', background: 'none'}}
    //       onClick={decoratedOnClick}
    //       variant = 'link'
    //     >
    //       {children}
    //     </Button>
    //   );
    // }

    return (
        <div style={{
            width: '100%',
            height: '4rem',
            border: '.2rem solid #ececec',
            borderRadius: '4px',
            padding: '0.5rem',
            marginBottom: '1rem',
            alignContent: "center",
        }}>
            <Container>
                <Row
                    className="d-flex justify-content-between align-items-center"
                >
                    {chatRoom && chatRoom.title}
                    <Button className="bg-danger border-0" onClick={handleLeaveChatRoom}>
                        채팅방 나가기
                    </Button>
                    {/*  <Col><h2><FaLock /> ChatRoomName <MdFavorite /></h2></Col>*/}
                    {/*  <Col><InputGroup className="mb-3">*/}
                    {/*    <InputGroup.Text id="basic-addon1"><AiOutlineSearch /></InputGroup.Text>*/}
                    {/*    <FormControl*/}
                    {/*      placeholder="Search Messages"*/}
                    {/*      aria-label="Search"*/}
                    {/*      aria-describedby="basic-addon1"*/}
                    {/*      onChange={handleSearchChange}*/}
                    {/*    />*/}
                    {/*  </InputGroup></Col>*/}
                    {/*</Row>*/}
                    {/*<div style={{ display: 'flex', justifyContent: 'flex-end' }}>*/}
                    {/*  <p>*/}
                    {/*    <Image src="" />{" "} user name*/}
                    {/*  </p>*/}
                    {/*</div>*/}
                    {/*<Row>*/}
                    {/*  <Col>*/}
                    {/*    <Accordion>*/}
                    {/*      <Card>*/}
                    {/*        <Card.Header>*/}
                    {/*          <CustomToggle  eventKey="0">Click me!</CustomToggle>*/}
                    {/*        </Card.Header>*/}
                    {/*        <Accordion.Collapse   eventKey="0">*/}
                    {/*          <Card.Body>Hello! I'm the body</Card.Body>*/}
                    {/*        </Accordion.Collapse>*/}
                    {/*      </Card>*/}
                    {/*    </Accordion>*/}
                    {/*  </Col>*/}
                    {/*  <Col>*/}
                    {/*  <Accordion>*/}
                    {/*      <Card>*/}
                    {/*        <Card.Header>*/}
                    {/*          <CustomToggle variant = 'link' eventKey="0">Click me!</CustomToggle>*/}
                    {/*        </Card.Header>*/}
                    {/*        <Accordion.Collapse   eventKey="0">*/}
                    {/*          <Card.Body>Hello! I'm the body</Card.Body>*/}
                    {/*        </Accordion.Collapse>*/}
                    {/*      </Card>*/}
                    {/*    </Accordion>*/}
                    {/*  </Col>*/}
                </Row>
            </Container>
        </div>
    )
}

MessageHeader.propTypes = {
    chatRoom: PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
    }),
    setChatRoom: PropTypes.func.isRequired,
}

export default MessageHeader