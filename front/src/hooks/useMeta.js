

function useMeta(title,description) {
  return (
    {
        title,
        description,
        canonical: "http://example.com/path/to/page",
        meta: {
          charset: "utf-8",
          name: {
            keywords: "react,meta,document,html,tags",
          },
        },
      }
  )
}

export default useMeta