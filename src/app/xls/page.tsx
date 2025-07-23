import styles from "./page.module.css"
import StatModule from "@/components/StatModule";
import FileUploader from "@/components/FileUploader"

export default async function Home() {
  return (
    <main>
      <div className={`${styles.container}`}>
        <h1>File uploader</h1>
        <form>
          <div>
            <FileUploader />
          </div>
        </form>
      </div>
    </main>
  );
}
