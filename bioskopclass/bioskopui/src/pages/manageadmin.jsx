import React, { Component } from 'react';
import Axios from 'axios'
import {Table,TableBody,TableHead,TableCell,TableRow} from '@material-ui/core'
import { APIURL } from '../support/ApiUrl';
import {Modal,ModalBody,ModalFooter,ModalHeader} from 'reactstrap'
import Fade from 'react-reveal/Fade'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { connect } from 'react-redux';



const MySwal = withReactContent(Swal)

class ManageAdmin extends Component {
    state = { 
        datafilm:[],
        readmoreselected:-1,
        modaladd:false,
        modaledit:false,
        indexedit:0,
        jadwal:[12,14,16,18,20,22]
    }

    componentDidMount(){
        Axios.get(`${APIURL}movies`)
        .then((res)=>{
            // console.log(res.data)
            Axios.get(`${APIURL}studios`)
            .then(res1=>{
                this.setState({
                    datafilm:res.data,
                    datastudio:res1.data
                })
            })
        }).catch((err)=>{
            console.log(err)
        })
    }

    onDeleteDataClick=(object)=>{
        // console.log(object)
        // var data=this.state.datafilm
        MySwal.fire({
            title: 'DELETE : '+ object.title,
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, cancel!',
            reverseButtons: true
          }).then((result) => {
            if (result.value) {
                MySwal.fire(
                    'Deleted!',
                    'Your file has been deleted.',
                    'success'
                  )
                  Axios.delete(`${APIURL}movies/${object.id}`, this.state.datafilm)
                  .then((res)=>{
                    Axios.get(`${APIURL}movies`)
                    .then((res)=>{
                        this.setState({datafilm:res.data,modaledit:false})
                    })
                }).catch((err)=>{
                    console.log(err)
                })
              MySwal.fire({
                  position: 'center',
                  icon: 'success',
                  title: 'Your work has been saved',
                  showConfirmButton: false,
                  timer: 1500
                })
            } else if (
              /* Read more about handling dismissals below */
              result.dismiss === Swal.DismissReason.cancel
            ) {
              MySwal.fire(
                'Cancelled',
                '',
                'error'
              )
            }
          })
    }

    onUpdateDataclick=()=>{
        var jadwaltemplate=this.state.jadwal
        var jadwal=[]
        var id=this.state.datafilm[this.state.indexedit].id
        // console.log(id)
        for(var i=0;i<jadwaltemplate.length;i++){
            if(this.refs[`editjadwal${i}`].checked){
                jadwal.push(jadwaltemplate[i])
            }
        }
        var iniref=this.refs
        var title=iniref.edittitle.value
        var image=iniref.editimage.value
        var sinopsis=iniref.editsinopsis.value
        var sutradara=iniref.editsutradara.value
        var genre=iniref.editgenre.value
        var durasi=iniref.editdurasi.value
        var trailer=iniref.edittrailer.value
        var studioId=iniref.editstudio.value
        var produksi='RANS ENTERTAINMENT'
        var data={
            title:title,
            image,
            sinopsis,
            sutradara,
            genre,
            durasi,
            produksi,
            jadwal,
            trailer,
            studioId
        }
        Axios.put(`${APIURL}movies/${id}`,data)
        .then(()=>{
            Axios.get(`${APIURL}movies/`)
            .then((res)=>{
                this.setState({datafilm:res.data,modaledit:false})
            })
            .catch((err)=>{
                console.log(err)
            })
        }).catch((err)=>{
            console.log(err)
        })
    }
    onSaveAddDataClick=()=>{
        var jadwaltemplate=[12,14,16,18,20]
        var jadwal=[]
        for(var i=0;i<jadwaltemplate.length;i++){
            if(this.refs[`jadwal${i}`].checked){
                jadwal.push(jadwaltemplate[i])
            }
        }
        var iniref=this.refs
        var title=iniref.title.value
        var image=iniref.image.value
        var sinopsis=iniref.sinopsis.value
        var sutradara=iniref.sutradara.value
        var genre=iniref.genre.value
        var durasi=iniref.durasi.value
        var trailer=iniref.trailer.value
        var studioId=iniref.studio.value
        var produksi='RANS ENTERTAINMENT'
        var data={
            title:title,
            image,
            sinopsis,
            sutradara,
            genre,
            durasi,
            produksi,
            jadwal,
            trailer,
            studioId
        }
        Axios.post(`${APIURL}movies`,data)
        .then(()=>{
            Axios.get(`${APIURL}movies`)
            .then((res)=>{
                this.setState({datafilm:res.data,modaladd:false})
            })
            .catch((err)=>{
                console.log(err)
            })
        }).catch((err)=>{
            console.log(err)
        })
    }

    renderMovies=()=>{
        return this.state.datafilm.map((val,index)=>{
            // console.log(val.jadwal,'jadwal')
            return(
                <TableRow key={index}>
                    <TableCell>{index+1}</TableCell>
                    <TableCell>{val.title}</TableCell>
                    <TableCell><img src={val.image} alt={'gambar'} height='200px'/></TableCell>
                    {   this.state.readmoreselected===index?
                            <TableCell style={{width:'300px'}}>
                                {val.sinopsis} 
                                <span style={{color:'red'}} onClick={()=>this.setState({readmoreselected:-1})}>
                                    Read less
                                </span>
                            </TableCell>
                        :
                        <TableCell style={{width:'300px'}}>
                            {val.sinopsis.split('').filter((val,index)=>index<=50)}
                            <span style={{color:'red'}} onClick={()=>this.setState({readmoreselected:index})}>
                                Read More
                            </span>
                        </TableCell>
                    }
                    <TableCell>{val.jadwal}</TableCell>
                    <TableCell>{val.sutradara}</TableCell>
                    <TableCell>{val.genre}</TableCell>
                    <TableCell>{val.durasi}</TableCell>
                    <TableCell>
                        <button className='btn btn-outline-primary mr-3' onClick={()=>this.setState({modaledit:true,indexedit:index})}>Edit</button>
                        <button className='btn btn-outline-danger' onClick={()=>this.onDeleteDataClick(val)}>Delete</button>
                    </TableCell>
                </TableRow>
            )
        })
    }

    renderEditCheckbox=(indexedit)=>{
        var indexarr=[]
        var datafilmedit=this.state.datafilm[indexedit].jadwal
        // console.log(datafilmedit)
        // console.log(this.state.jadwal)
        // console.log(this.state.jadwal.indexOf(datafilmedit[1]))
        // datafilmedit.forEach((val)=>{
        //     indexarr.push(this.state.jadwal.indexOf(val))
        // })
        for(var i=0;i<datafilmedit.length;i++){
            for(var j=0;j<this.state.jadwal.length;j++){
                if(datafilmedit[i]===this.state.jadwal[j]){
                    indexarr.push(j)
                }
            }
        }
        var checkbox=this.state.jadwal
        var checkboxnew=[]
        checkbox.forEach((val)=>{
            checkboxnew.push({jam:val,tampiledit:false})
        })
        indexarr.forEach((val)=>{
            checkboxnew[val].tampiledit=true
        })
        return checkboxnew.map((val,index)=>{
                if(val.tampiledit){
                        return (
                            <div key={index}>
                                <input type="checkbox" defaultChecked ref={`editjadwal${index}`} value={val.jam}/> 
                                <span className='mr-2'>{val.jam}.00</span>
                            </div>
                        )
                }else{
                    return (
                        <div key={index}>
                            <input type="checkbox"  ref={`editjadwal${index}`} value={val.jam}/> 
                            <span className='mr-2'>{val.jam}.00</span>
                        </div> 
                    )
                }
        })
    }

    renderAddCheckbox=()=>{
        return this.state.jadwal.map((val,index)=>{
            return(
                <div key={index}>
                    <input type="checkbox" ref={`jadwal${index}`}/> 
                    <span className='mr-2'>{val}.00</span> 
                </div>
            )
        })
    }
    render() {
        const {datafilm,indexedit}=this.state
        const {length}=datafilm
        // console.log('propsrole',this.props.role)

        if(length===0){
            return <div>loading</div>
        }else if(this.props.role==='admin'){
            return (
                <div className='mx-3'>
                        <Modal isOpen={this.state.modaledit} toggle={()=>this.setState({modaledit:false})}>
                        <ModalHeader>
                            Edit Data {datafilm[indexedit].title}
                        </ModalHeader>
                        <ModalBody>
                            <input type="text" defaultValue={datafilm[indexedit].title} ref='edittitle'  placeholder='title' className='form-control mt-2'/>
                            <input type="text" defaultValue={datafilm[indexedit].image} ref='editimage' placeholder='image'className='form-control mt-2'/>
                            <textarea rows='5' ref='editsinopsis' defaultValue={datafilm[indexedit].sinopsis} placeholder='sinopsis' className='form-control mt-2 mb-2'/>
                            Jadwal:
                            <div className="d-flex">
                                {this.renderEditCheckbox(indexedit)}
                            </div>
                            <input type="text" defaultValue={datafilm[indexedit].trailer} ref='edittrailer' placeholder='trailer'className='form-control mt-2' />
                            <select ref='editstudio' className='form-control mt-2'>
                                {
                                    this.state.datastudio.map((val)=>{
                                        return(
                                            <option value={val.id}>{val.nama}</option>
                                        )
                                    })
                                }  
                            </select> 
                            <input type="text" defaultValue={datafilm[indexedit].sutradara}  ref='editsutradara' placeholder='sutradara' className='form-control mt-2'/>
                            <input type="number" defaultValue={datafilm[indexedit].durasi}  ref='editdurasi' placeholder='durasi' className='form-control mt-2'/>
                            <input type="text" defaultValue={datafilm[indexedit].genre} ref='editgenre' placeholder='genre' className='form-control mt-2'/>
                        </ModalBody>
                        <ModalFooter>
                            <button onClick={this.onUpdateDataclick} >Save</button>
                            <button onClick={()=>this.setState({modaledit:false})}>Cancel</button>
                        </ModalFooter>
                    </Modal>
                    <Modal isOpen={this.state.modaladd} toggle={()=>this.setState({modaladd:false})}>
                        <ModalHeader>
                            Add Data
                        </ModalHeader>
                        <ModalBody>
                            <input type="text" ref='title'  placeholder='title' className='form-control mt-2'/>
                            <input type="text" ref='image' placeholder='image'className='form-control mt-2'/>
                            <input type="text" ref='sinopsis'  placeholder='sinopsis' className='form-control mt-2 mb-2'/>
                            Jadwal:
                            <div className="d-flex">
                                {this.renderAddCheckbox()}
                            </div>
                            <input type="text" ref='trailer' placeholder='trailer'className='form-control mt-2' />
                            <select ref='studio' className='form-control mt-2'>
                                {
                                    this.state.datastudio.map((val)=>{
                                        return(
                                            <option value={val.id}>{val.nama}</option>
                                        )
                                    })
                                }  
                            </select> 
                            <input type="text"  ref='sutradara' placeholder='sutradara' className='form-control mt-2'/>
                            <input type="number"  ref='durasi' placeholder='durasi' className='form-control mt-2'/>
                            <input type="text" ref='genre' placeholder='genre' className='form-control mt-2'/>
                        </ModalBody>
                        <ModalFooter>
                            <button onClick={this.onSaveAddDataClick}>Save</button>
                            <button onClick={()=>this.setState({modaladd:false})}>Cancel</button>
                        </ModalFooter>
                    </Modal>
                    <Fade>
                        <button className='btn btn-success' onClick={()=>this.setState({modaladd:true})}> add Data</button>
                        <Table size='small' >
                            <TableHead>
                                <TableRow>
                                    <TableCell>No.</TableCell>
                                    <TableCell>Judul</TableCell>
                                    <TableCell>Image</TableCell>
                                    <TableCell>Sinopsis</TableCell>
                                    <TableCell>Jadwal</TableCell>
                                    <TableCell>Sutradara</TableCell>
                                    <TableCell>Genre</TableCell>
                                    <TableCell>Durasi</TableCell>
                                    <TableCell>Action</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {this.renderMovies()}
                            </TableBody>
                        </Table>
                    </Fade>
                </div>
            );
        }else
        return(
            <div id="notfound">
            <div class="notfound">
                <div class="notfound-404">
                    <h3>Oops! Page not found</h3>
                    <h1><span>4</span><span>0</span><span>4</span></h1>
                </div>
                <h2>we are sorry, but the page you requested was not found</h2>
            </div>
        </div>
        )
    }
}

const MapstateToprops=(state)=>{
    return{
        role:state.Auth.role,
  
    }
  }
 
export default  connect(MapstateToprops) (ManageAdmin);