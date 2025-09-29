"use client";

import Button from "@/components/layout/form/Button";
import Input from "@/components/layout/form/Input";
import Textarea from "@/components/layout/form/Textarea";
import { Exercise } from "@/types/exercise";

const exercisesTypes = ["MULTIPLE_CHOICE", "WRITE_CODE", "COMPLETE_CODE"];

export default function EditExerciseForm({ exercise }: { exercise: Exercise }) {
    return (
        <form className="flex flex-col gap-4 justify-center">
            <div className="flex flex-col gap-2 grow">
                <label htmlFor="type" className="text-lavender-blush text-xl">
                    Tipo:
                </label>
                <select
                    name="type"
                    id="type"
                    className="bg-white p-1.5 rounded-md"
                >
                    {exercisesTypes.map((exerciseType) => (
                        <option value={exerciseType} key={exerciseType}>
                            {exerciseType}
                        </option>
                    ))}
                </select>
            </div>
            <Textarea id="content" label="Conteúdo" placeholder="Conteúdo" />
            ESCOLHAS
            <Button text="Enviar" />
            <input type="hidden" name="id" value={exercise.id} />
        </form>
    );
}
