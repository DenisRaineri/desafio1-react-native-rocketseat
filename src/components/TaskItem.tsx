import React, { useEffect, useRef } from "react";
import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
} from "react-native";
import Icon from "react-native-vector-icons/Feather";

import trashIcon from "../assets/icons/trash/trash.png";
import penIcon from "../assets/icons/pen.png";
import xIcon from "../assets/icons/Vector.png";

export interface Task {
  id: number;
  title: string;
  done: boolean;
}

interface TasksItemProps {
  task: Task;
  index: number;
  toggleTaskDone: (id: number) => void;
  removeTask: (id: number) => void;
  editTask: (taskId: number, taskNewTitle: string) => void;
}

export function TaskItem({
  task,
  index,
  toggleTaskDone,
  removeTask,
  editTask,
}: TasksItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState("");

  const textInputRef = useRef<TextInput>(null);
  const { title, id, done } = task;

  useEffect(() => {
    if (textInputRef.current) {
      if (isEditing) {
        textInputRef.current.focus();
      } else {
        textInputRef.current.blur();
      }
    }
  }, [isEditing]);

  function handleStartEditing() {
    return setIsEditing(true);
  }

  function handleCancelEditing() {
    setNewTaskTitle(title);
    setIsEditing(false);
  }

  function handleSubmitEditing() {
    editTask(id, newTaskTitle);
    setIsEditing(false);
  }

  return (
    <>
      <View>
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.taskButton}
          onPress={() => toggleTaskDone(id)}
        >
          <View
            style={done ? styles.taskMarkerDone : styles.taskMarker}
          >
            {done && <Icon name="check" size={12} color="#FFF" />}
          </View>

          {isEditing ? (
            <TextInput
              value={newTaskTitle}
              onChangeText={(event) => setNewTaskTitle(event)}
              editable={isEditing}
              onSubmitEditing={handleSubmitEditing}
              returnKeyType="send"
              style={done ? styles.taskTextDone : styles.taskText}
              ref={textInputRef}
            />
          ) : (
            <Text style={done ? styles.taskTextDone : styles.taskText}>
              {title}
            </Text>
          )}
        </TouchableOpacity>
      </View>

      <View style={styles.iconsContainer}>
        {isEditing ? (
          <TouchableOpacity
            style={{ paddingHorizontal: 24 }}
            onPress={() => handleCancelEditing()}
          >
            <Image source={xIcon} />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={{ paddingHorizontal: 24 }}
            onPress={() => handleStartEditing()}
          >
            <Image source={penIcon} />
          </TouchableOpacity>
        )}

        <View style={styles.divider} />

        <TouchableOpacity
          style={{ paddingHorizontal: 24 }}
          onPress={() => removeTask(id)}
          disabled={isEditing}
        >
          <Image source={trashIcon} style={{ opacity: isEditing ? 0.2 : 1 }} />
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  taskButton: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 15,
    marginBottom: 4,
    borderRadius: 4,
    flexDirection: "row",
    alignItems: "center",
  },
  taskMarker: {
    height: 16,
    width: 16,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#B2B2B2",
    marginRight: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  taskText: {
    color: "#666",
    fontFamily: "Inter-Medium",
  },
  taskMarkerDone: {
    height: 16,
    width: 16,
    borderRadius: 4,
    backgroundColor: "#1DB863",
    marginRight: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  taskTextDone: {
    color: "#1DB863",
    textDecorationLine: "line-through",
    fontFamily: "Inter-Medium",
  },
  divider: {
    borderColor: "rgba(196, 196, 196, 0.24)",
    height: 24,
    width: 0,
    borderWidth: 1,
  },
  iconsContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
});