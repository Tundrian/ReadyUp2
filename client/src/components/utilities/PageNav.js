function PageNav({next, prev, updateFetch}) {
    const onClick = (e) => {
      updateFetch(e.target.value)
    }
    return (
    <section className="pageNav-container">
        {prev && <button className="pageNav-button" onClick={onClick} value={prev}>Prev</button>}
        {next && <button className="pageNav-button" onClick={onClick} value={next}>Next</button>}
    </section>
  )
}

export default PageNav