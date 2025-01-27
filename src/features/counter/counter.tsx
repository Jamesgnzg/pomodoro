import { Button } from "@/components/ui/button";
import { FC, ReactElement, useState, useEffect } from "react";
import { timeSettings } from "@/enums/time-settings";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { useTasks } from "@/context/Task-context";

interface ICounterButtonProps {
  label: string;
  updateTimer: () => void;
}

const CounterButton: FC<ICounterButtonProps> = ({
  label,
  updateTimer,
}: ICounterButtonProps): ReactElement => {
  const { setTextClass } = useTasks();

  return (
    <Button
      variant="secondary"
      className={`mt-10 min-w-52 min-h-16 text-4xl ${setTextClass()}`}
      onClick={() => updateTimer()}
    >
      {label}
    </Button>
  );
};

const Counter: FC = (): ReactElement => {
  const {
    timerRunning,
    selectedTask,
    setTimer,
    updateTaskItem,
    updateColorTheme,
  } = useTasks();
  const { POMODORO, SHORT_BREAK, LONG_BREAK } = timeSettings;
  const [timeRemaining, setTimeRemaining] = useState<number>(POMODORO.time);
  const [workStatus, setWorkStatus] = useState<string>(POMODORO.label);

  const setTime = (time: number): void => {
    setTimeRemaining(time);
  };

  const completeTimer = (): void => {
    if (workStatus == POMODORO.label) {
      setTimeRemaining(SHORT_BREAK.time);
      setWorkStatus(SHORT_BREAK.label);
    } else {
      setTimeRemaining(POMODORO.time);
      setWorkStatus(POMODORO.label);
    }

    if (selectedTask) {
      updateTaskItem(
        selectedTask.id,
        "completedPomodoros",
        selectedTask.completedPomodoros + 1
      );
    }

    setTimer(false);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining((time) => {
        if (time === 0) {
          clearInterval(timer);
          setTimer(false);
          return 0;
        } else {
          return time - 1;
        }
      });
    }, 1000);

    if (timerRunning) {
      // return clean up function
      return () => clearInterval(timer);
    } else {
      // pause the timer
      clearInterval(timer);
    }
  }, [timerRunning, timeRemaining]);

  return (
    <>
      <div className="block max-w-full p-6 rounded-lg bg-bgColor">
        <ToggleGroup
          type="single"
          value={workStatus}
          onValueChange={(value) => {
            setWorkStatus(value);
            setTimer(false);
          }}
          defaultValue={POMODORO.label}
        >
          <ToggleGroupItem
            className="text-lg text-white"
            onClick={() => {
              updateColorTheme(POMODORO.color);
              setTime(POMODORO.time);
            }}
            value={POMODORO.label}
          >
            {POMODORO.label}
          </ToggleGroupItem>
          <ToggleGroupItem
            className="text-lg text-white"
            onClick={() => {
              updateColorTheme(SHORT_BREAK.color);
              setTime(SHORT_BREAK.time);
            }}
            value={SHORT_BREAK.label}
          >
            {SHORT_BREAK.label}
          </ToggleGroupItem>
          <ToggleGroupItem
            className="text-lg text-white"
            onClick={() => {
              updateColorTheme(LONG_BREAK.color);
              setTime(LONG_BREAK.time);
            }}
            value={LONG_BREAK.label}
          >
            {LONG_BREAK.label}
          </ToggleGroupItem>
        </ToggleGroup>
        <div className="flex flex-col text-center items-center mt-5">
          <p className="text-9xl text-white">
            {`${Math.floor(timeRemaining / 60)}`.padStart(2, "0")}:
            {`${timeRemaining % 60}`.padStart(2, "0")}
          </p>
          {timerRunning ? (
            <div className="flex gap-5">
              <CounterButton
                label="PAUSE"
                updateTimer={() => setTimer(false)}
              />
              <CounterButton label="STOP" updateTimer={() => completeTimer()} />
            </div>
          ) : (
            <CounterButton label="START" updateTimer={() => setTimer(true)} />
          )}
        </div>
      </div>
    </>
  );
};

export default Counter;
