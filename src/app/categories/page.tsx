import Category from "@/components/Categories"
import AddForm from "@/components/AddCategoriesForm"

export default async function Categories() {
    return (
        <main>
            <div>
                <Category />
                <AddForm />
            </div>
        </main>
    )
}