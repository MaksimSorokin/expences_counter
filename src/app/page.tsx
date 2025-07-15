import styles from "./page.module.css";
import FileUploader from "@/components/FileUploader"

export default async function Home() {
  return (
    <main>
      <div className={`${styles.container}`}>
        <h1>File uploader</h1>
        <form>
          <div>
            <h3>Thumbnail</h3>
            <FileUploader />
          </div>
        </form>
      </div>
    </main>
  );
}
