#!/usr/bin/env bash
#scheme: ./docker-util <command> [options] <DockerObjectID>

args=("$@");

function stop() {
  local VERBOSE=0
  local REMOVE=1

  while getopts ":vr" opt; do
    case $opt in
      v)
        VERBOSE=1
        ;;
      r)
        REMOVE=0
        ;;
      \?)
        echo "Invalid option: -$OPTARG" >&2
        exit 1
        ;;
      :)
        echo "Option -$OPTARG requires an argument" >&2
        ;;
    esac
  done

  shift $((OPTIND-1))

  if [ -z "$1" ]
  then 
    echo 'Missing Docker Container ID' >&2
    echo "Usage: ${0} stop [options] <ContainerID>" >&2
    exit 1
  fi

  if [ $VERBOSE -eq 1 ]
  then
    echo "Stopping Docker Container: ${1}..."
  fi

  echo `docker stop ${1}`

  if [ $REMOVE -eq 1 ]
  then
    if [ $VERBOSE -eq 1 ]
    then
      echo "Removing Docker Container: ${1}..."
    fi

    echo `docker rm ${1}`
  fi

  echo "Docker Stop Complete!"
}


COMMAND=$1
shift 1
case $COMMAND in
  stop) 
    stop $@
    ;;
  *)
    echo "Usage: ${0} <command> [options] <DockerID>"
    exit 1
    ;;
esac
