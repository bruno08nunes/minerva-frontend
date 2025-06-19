export default function ExerciseParagraph({ content }: { content: string }) {
    return (
        <p className="text-lavender-blush text-center text-xl max-w-[800px] mx-auto mb-6">
            {content}
        </p>
    );
}
