import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";

interface UseControllableStateProps<T> {
  defaultValue?: T;
  value?: T;
  onChange?: (value: T) => void;
}

type SetState<T> = Dispatch<SetStateAction<T>>;

function useControllableState<T>(
  props: UseControllableStateProps<T>,
): [T, SetState<T>] {
  const { defaultValue, value, onChange } = props;
  const isControlled = value !== undefined;
  const [internalState, setInternalState] = useState<T>(defaultValue as T);
  const currentValue = isControlled ? value : internalState;

  useEffect(() => {
    if (!isControlled && defaultValue !== undefined) {
      setInternalState(defaultValue);
    }
  }, [defaultValue, isControlled]);

  const setValue = useCallback<SetState<T>>(
    (newValue) => {
      const finalValue =
        typeof newValue === "function"
          ? (newValue as (prevState: T) => T)(currentValue)
          : newValue;

      if (!isControlled) {
        setInternalState(finalValue);
      }

      if (onChange) {
        onChange(finalValue);
      }
    },
    [currentValue, isControlled, onChange],
  );

  return [currentValue as T, setValue];
}

export default useControllableState;
