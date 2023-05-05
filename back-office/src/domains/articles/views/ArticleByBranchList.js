import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import isEnglish from '../../../helpers/isEnglish'
import { fetchArticles } from '../../../store/article'
import { Button } from 'react-bootstrap'

function ArticleByBranchList() {
    const articleStore = useSelector(state => state.article)
    const [articles, setArticles] = useState([])
    const dispatch = useDispatch()
    const isEng = isEnglish()
    useEffect(() => {
        dispatch(fetchArticles())
    }, [dispatch])
    useEffect(() => {
        if (articleStore.articles.items.length) {
            let aux = articleStore.articles.items.map(elem => {
                let total = 0
                elem.ArticlesByBranch.forEach(element => {
                    total += element.stock
                });
                return {
                    ...elem,
                    total
                }
            }
            )
            setArticles(aux)
        }
    }, [articleStore.articles.items])
    return (
        <div>
            <h2>Article By Branch List</h2>
            <div className='d-flex flex-wrap'>
                {articles.map((element, i) => (
                    <div>
                        <div>
                            <img src={element.cover.path} />
                        </div>
                        <div>
                            <div className='d-flex'>
                                <div style={{ width: 100 }}>branch</div>
                                <div style={{ width: 100 }}>qte</div>
                                <div style={{ width: 100 }}>price</div>
                            </div>
                            {element.ArticlesByBranch.map((elem, j) => (
                                <div className='d-flex'>
                                    <div style={{ width: 100 }}>{elem.branch.name}</div>
                                    <div style={{ width: 100 }}>{elem.stock}</div>
                                    <div style={{ width: 100 }}>{elem.price}</div>
                                </div>
                            ))}
                            <div className='d-flex'>
                                <div style={{ width: 100 }}>total</div>
                                <div style={{ width: 100 }}>{element.total}</div>

                            </div>
                        </div>
                        <div><Button>Add transaction</Button></div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ArticleByBranchList