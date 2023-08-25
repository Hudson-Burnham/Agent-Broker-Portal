import { FormProvider, UseFormReturn } from "react-hook-form";

type Props =  {
    methods: UseFormReturn<any>
    children: any;
    onSubmit: () => void
}

export default function Form({methods, children, onSubmit}: Props) {
  return (
    <FormProvider {...methods}>
        <form onSubmit={onSubmit}>{children}</form>
    </FormProvider>
  )
}
//chat should be like discord chat
//profile drawer
//creata group chat
//group chat functionalities
//attachment in input form
//error handling notification
