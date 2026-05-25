import express from 'express'
import cors from 'cors'
import fs from 'fs'
import path from 'path'

const app = express()
app.use(express.json())

if (process.env.NODE_ENV !== 'production') {
    app.use(cors({ origin: 'http://localhost:5173' }))
}

const ROOT_DOCS_PATH = path.resolve(process.cwd(), './src/docs')
console.log("ROOT_DOCS_PATH", ROOT_DOCS_PATH)

const buildDocsMap = (dir, baseMap = {}) => {
    const files = fs.readdirSync(dir)

    for (const file of files) {
        const fullPath = path.join(dir, file)
        const stat = fs.statSync(fullPath)

        if (stat.isDirectory()) {
            buildDocsMap(fullPath, baseMap)
        } else if (file.endsWith('.md')) {
            // Calculate a relative identifier key (e.g., 'core/intro')
            const relativePath = path.relative(ROOT_DOCS_PATH, fullPath)
            const docId = relativePath.replace(/\\/g, '/').replace('.md', '')
            baseMap[docId] = fullPath
        }
    }
    return baseMap
}
const allowedDocsMap = buildDocsMap(ROOT_DOCS_PATH);
console.log("allowedDocsMap", JSON.stringify(allowedDocsMap, null, 2));

app.post('/api/save', (req, res) => {
    const { docId, content } = req.body

    console.log("posted " + docId)

    // Strict Validation, filepath exists or not
    const targetFilePath = allowedDocsMap[docId]
    console.log("targetFilePath", targetFilePath);

    if (!targetFilePath) {
        return res.status(403).send('Access Denied.')
    }

    // Double-check file safety to prevent any path escaping
    if (!targetFilePath.startsWith(ROOT_DOCS_PATH)) {
        return res.status(403).send('Access Denied.')
    }

    fs.writeFile(targetFilePath, content, 'utf8', (err) => {
        if (err) {
            console.error(err)
            return res.status(500).send('Error writing file to disk.')
        }
        console.log("File saved successfully");
        res.send('File saved successfully.');
    })
})

app.get("/api/debug", (req, res) => res.json({ message: "alive" }));

app.listen(3000, () => console.log('Dev server running on port 3000'));