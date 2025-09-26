import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";

function ThreeColumns() {
  const items = [
    { img: "/images/pic1.jpg", title: "Column 1", desc: "This is the first column description." },
    { img: "/images/pic2.jpg", title: "Column 2", desc: "This is the second column description." },
    { img: "/images/pic3.jpg", title: "Column 3", desc: "This is the third column description." }
  ];

  return (
    <section id="three" className="py-5">
      <Container>
        <Row>
          {items.map((item, idx) => (
            <Col md={4} sm={12} key={idx} className="mb-4">
              <Card className="h-100 shadow">
                <Card.Img variant="top" src={item.img} />
                <Card.Body>
                  <Card.Title>{item.title}</Card.Title>
                  <Card.Text>{item.desc}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
}

export default ThreeColumns;
