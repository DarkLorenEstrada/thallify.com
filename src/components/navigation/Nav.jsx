import { useState } from "react"
import { useLocation } from "react-router-dom"
import { toPng } from 'html-to-image'
import { saveAs } from 'file-saver'
import { downloadIcon, gridIcon, listIcon, loadingIcon } from "../../assets/icons/icons"
import "./styles/Nav.css"

const Nav = ({active, setTimeRange, setLayout, layout, setItemLimit, itemLimit, maxItemLimit}) => {
    const location = useLocation()
    const [isSaving, setIsSaving] = useState(false)


    const downloadImage = () => {
        setIsSaving(true)
        document.querySelector('.image-node').classList.add('saving')

        setTimeout(() => {
            const node = document.querySelector('.image-node')
            const newElement = document.createElement('div')
            const newElement2 = document.createElement('div')
            node.classList.add('saving')

            newElement.className = 'p-1 title-2 border-bottom text-center'
            newElement.style.gridColumn = '1/-1'
            newElement.innerHTML = `
            <div>
            ${location.pathname.includes('/recently-played') ? 'My recently played tracks'
            :
            `My top ${location.pathname.includes('/top-artists') ? 'artists' : 'tracks'} ${active === 'short_term' ? 'last month' : active === 'medium_term' ? 'last 6 month' : 'of all time'}`
            }
            </div>
            `

            newElement2.className = `${layout === 'list_layout' ? 'p-1' : 'px-2 pt-2'} fs-5 border-top text-end`
            newElement2.style.gridColumn = '1/-1'
            newElement2.innerHTML = `
            <p class="text-end">
                Snapshot taken on thallify.com
            </p>
            `
            node.insertBefore(newElement, node.firstChild)
            node.appendChild(newElement2)

            toPng(node)
            .then(function (dataUrl) {
                saveAs(dataUrl, 'thallify.png');
                setIsSaving(false)
                node.classList.remove('saving')
                document.querySelector('.image-node').removeChild(newElement)
                // document.querySelector('.image-node').removeChild(newElement2)
            })
            .catch(function (error) {
                setIsSaving(false)
                node.classList.remove('saving')
                document.querySelector('.image-node').removeChild(newElement)
                document.querySelector('.image-node').removeChild(newElement2)
                console.error('oops, something went wrong!', error);
            });
        }, 1000)
    }

    return (
        <div className="nav">
            <div className="nav-left">
                {!location.pathname.includes('/recently-played') && (
                <>
                <div 
                    onClick={() => setTimeRange('short_term')}
                    className={`nav-item${active === 'short_term' ? ' active' : '' }`}>
                    Last month
                </div>
                <div 
                    onClick={() => setTimeRange('medium_term')}
                    className={`nav-item${active === 'medium_term' ? ' active' : '' }`}>
                    Last 6 months
                </div>
                <div 
                    onClick={() => setTimeRange('long_term')}
                    className={`nav-item${active === 'long_term' ? ' active' : '' }`}>
                    All time
                </div>
                </>
                )}
            </div>
            <div className="nav-right">
                <div className={`nav-item`}>
                    <input
                        onClick={(e) => e.target.select()}
                        title="Item limit"
                        type="number"
                        value={itemLimit}
                        onChange={(e) => { 
                            e.target.value < 0 ?
                            setItemLimit(0) :
                            e.target.value > 50 ?
                            setItemLimit(50) :
                            setItemLimit(e.target.value)
                        }}
                    />
                </div>
                {isSaving ? (
                    <div
                        title="Downloading image"
                        className={`nav-item spinner`}>
                        {loadingIcon}
                    </div>
                ) : 
                    <div
                        title="Download"
                        onClick={downloadImage}
                        className={`nav-item`}>
                        {downloadIcon}
                    </div>
                }
                <div
                    className={`nav-item divider`}>
                    |
                </div>
                <div
                    title="Grid"
                    onClick={() => setLayout('gird_layout')}
                    className={`nav-item${layout === 'gird_layout' ? ' active' : '' }`}>
                    {gridIcon}
                </div>
                <div 
                    title="List"
                    onClick={() => setLayout('list_layout')}
                    className={`nav-item${layout === 'list_layout' ? ' active' : '' }`}>
                    {listIcon}
                </div>
            </div>
        </div>
    )
}

export default Nav