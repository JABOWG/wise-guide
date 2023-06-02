import {
    Container,
    Col,
    Form,
    Button,
    Card,
    Row
  } from '@mui/material/Container';
//import Container from '@mui/material/Container';

const QuestionsForm = () => {

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        try {

        } catch (e) {
            console.log(e);
        }
    }
    return (
        <div>
            <Container>
                <div class="searchContainer">
                    <h1>ASK ME ANYTHING!</h1>
                    <form onSubmit={handleFormSubmit}>
                        <Row>
                            <input></input>
                        </Row>
                        <Row>
                            <Button type="submit">
                                Submit Question
                            </Button>
                            <Button type="submit">
                                Save Lesson
                            </Button>
                            <Button type="submit">
                                Share Lesson
                            </Button>
                        </Row>
                    </form>
                </div>
            </Container>
            <div class="diplayContainer">

            </div>
        </div>
        
    );
}

    

export default QuestionsForm;