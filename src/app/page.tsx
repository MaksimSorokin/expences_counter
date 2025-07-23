import AddForm from "@/components/AddExpenseForm";

export default async function Home() {
    return (
        <main>
            <div className="flex items-center justify-center pt-12">
                <AddForm />
            </div>
        </main>
    )
}