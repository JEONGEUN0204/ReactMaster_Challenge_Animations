import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const Wrapper = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  width: 50vw;
  gap: 10px;
  margin-bottom: 40px;
`;

const Box = styled(motion.div)`
  background-color: rgba(255, 255, 255, 0.3);
  border-radius: 20px;
  height: 200px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Overlay = styled(motion.div)`
  width: 100%;
  height: 100%;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  bottom: 50px;
`;

const Button = styled(motion.button)<{ variants: any }>`
  width: 100px;
  height: 50px;
  border-radius: 30px;
  border: none;
  font-size: 25px;
`;

const Circle = styled(motion.div)`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: white;
`;

const overlay = {
  hidden: { backgroundColor: "rgba(0, 0, 0, 0)" },
  visible: { backgroundColor: "rgba(0, 0, 0, 0.5)" },
  exit: { backgroundColor: "rgba(0, 0, 0, 0)" },
};

const boxVariants = {
  hover: (custom: string) => ({
    scale: 1.1,
    x: custom === "1" || custom === "3" ? -20 : 20,
    y: custom === "1" || custom === "2" ? -20 : 20,
  }),
};

const buttonVariants = {
  animate: { color: "pink", width: "120px", height: "70px" },
  trans: { delay: 1 },
};

function App() {
  const [id, setId] = useState<null | string>(null);
  const [isMove, setIsMove] = useState<boolean>(false);
  return (
    <Wrapper>
      <Grid>
        {["1", "2", "3", "4"].map((n) => (
          <Box
            custom={n}
            variants={boxVariants}
            onClick={() => setId(n)}
            key={n}
            layoutId={n}
            whileHover="hover"
          >
            {!isMove && n === "2" && <Circle layoutId="circle" />}
            {isMove && n === "3" && <Circle layoutId="circle" />}
          </Box>
        ))}
      </Grid>
      <AnimatePresence>
        {id ? (
          <Overlay
            variants={overlay}
            onClick={() => setId(null)}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <Box
              layoutId={id}
              style={{
                backgroundColor: "rgba(255, 255, 255, 1)",
                width: "200px",
              }}
            />
          </Overlay>
        ) : null}
      </AnimatePresence>
      <Button
        variants={buttonVariants}
        onClick={() => setIsMove(!isMove)}
        animate={
          isMove
            ? { color: "pink", width: "110px", height: "60px" }
            : { color: "black", width: "100px", height: "50px" }
        }
        transition={{ delay: 0.1 }}
      >
        switch
      </Button>
    </Wrapper>
  );
}

export default App;
