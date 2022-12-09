import { MdDeleteForever } from "react-icons/md";
import { useState } from "react";
import {
  Box,
  IconButton,
  Checkbox,
  Input,
  Text,
  Container,
} from "@chakra-ui/react";

function Task({ task, deleteTask, checkTask, loadingPage, saveСhangedTitle }) {
  const date = task.createdAt ? new Date(task.createdAt) : "";

  const [editStatus, setEditStatus] = useState(false);
  const handleEditStatus = () => setEditStatus(!editStatus);

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      my="2"
      px="2"
      fontSize="22"
      fontStyle="italic"
      color="rgb(56, 27, 102)"
      borderRadius="8"
      bg={task.done && "rgba(54, 197, 54, 0.527)"}
      textDecoration={task.done && "line-through"}
    >
      <Checkbox
        defaultChecked={task.done ? true : false}
        onChange={() => checkTask(task)}
        size="lg"
        opacity="0.8"
        transitionDuration="300ms"
        _hover={{ transform: "scale(1.2)", opacity: 1.0 }}
        isDisabled={loadingPage}
        bg="rgba(101, 181, 128, 0.6)"
        borderRadius="20"
      />

      <Text
        onDoubleClick={handleEditStatus}
        flexGrow="1"
        flexBasis="auto"
        textAlign="left"
        wordBreak="break-all"
        px="3"
        marginLeft="2"
      >
        {editStatus ? (
          <Input
            autoFocus
            defaultValue={task.name}
            onBlur={handleEditStatus}
            onKeyDown={(e) => {
              if (e.code === "Enter" || e.key === 13)
                saveСhangedTitle(e, task) && handleEditStatus();
              if (e.code === "Escape") handleEditStatus();
            }}
            isDisabled={loadingPage}
            width="85%"
            fontSize="20"
            color="rgb(47, 22, 87)"
            fontStyle="italic"
            bg="white"
          ></Input>
        ) : (
          task.name
        )}
      </Text>

      <Container
        display="flex"
        flexDirection="column"
        fontSize="18"
        flexBasis="5"
        m='0' p='0'
      >
        <Text>
          {[date.getDate(), date.getMonth() + 1, date.getFullYear()].join("/")}
        </Text>
        <Text>
          {[date.getHours(), date.getMinutes(), date.getSeconds()]
            .map((x) => (x < 10 ? "0" + x : x))
            .join(":")}
        </Text>
      </Container>

      <IconButton
        onClick={() => deleteTask(task.uuid)}
        isDisabled={loadingPage}
        opacity={loadingPage ? 0.5 : 0.8}
        color="rgb(236, 48, 48)"
        aria-label="Delete task"
        fontSize="27"
        icon={<MdDeleteForever />}
        bg="rgba(236, 48, 48, 0)"
        _hover={{ transform: "scale(1.2)", opacity: 1.0 }}
        transitionDuration="300ms"
        flexBasis="25"
      />
    </Box>
  );
}

export default Task;
